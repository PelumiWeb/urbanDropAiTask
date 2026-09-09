import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Composer, OptionsSheet } from '@/components/drop-ai/composer';
import { Header } from '@/components/drop-ai/header';
import { HistoryView } from '@/components/drop-ai/history-view';
import { AssistantText, ErrorTurn, Thinking, UserBubble, enterMessage } from '@/components/drop-ai/messages';
import { OverflowMenu, Toast, VoiceSheet } from '@/components/drop-ai/overlays';
import { BasketCard, OrderCards } from '@/components/drop-ai/payloads';
import { FollowUps } from '@/components/drop-ai/primitives';
import { ModeChips } from '@/components/drop-ai/mode-chips';
import { StoreCarousel } from '@/components/drop-ai/store-carousel';
import { Colors, Fonts, Gutter, Motion } from '@/constants/theme';
import {
  LATENCY_MS,
  dealResults,
  greeting,
  pastOrders,
  starterPrompts,
  querySuggestions,
  recipeAnswer,
  requestFails,
  routeIntent,
  storeResults,
  user,
  voice,
  type Intent,
  type Order,
  type StarterPrompt,
} from '@/data/drop-ai-mock';

type Kind = 'user' | 'thinking' | 'error' | Intent;
type Message = { id: number; kind: Kind; text?: string };

const startedAt = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

export default function DropAIScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const scroller = useRef<ScrollView>(null);
  const pending = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nextId = useRef(0);

  const [messages, setMessages] = useState<Message[]>([]);
  const [history, setHistory] = useState(false);
  const [historyCleared, setHistoryCleared] = useState(false);
  const [draft, setDraft] = useState('');
  const [focused, setFocused] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [mode, setMode] = useState(starterPrompts[0].label);
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [basketCount, setBasketCount] = useState(user.basketCount);
  const [lastQuery, setLastQuery] = useState('');

  useEffect(() => () => clearTimeout(pending.current ?? undefined), []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => scroller.current?.scrollToEnd({ animated: true }));
    return () => cancelAnimationFrame(frame);
  }, [messages]);

  const flash = useCallback((message: string) => setToast(message), []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(''), Motion.toastHold);
    return () => clearTimeout(timer);
  }, [toast]);

  const ask = useCallback((text: string, intent?: Intent, displayText?: string) => {
    const query = text.trim();
    if (!query) return;

    const userTurn: Message = {
      id: nextId.current++,
      kind: 'user',
      text: displayText ?? query,
    };
    const thinkingTurn: Message = { id: nextId.current++, kind: 'thinking' };

    setLastQuery(query);
    setDraft('');
    setFocused(false);
    setSheetOpen(false);
    setHistory(false);
    setMessages((current) => [...current, userTurn, thinkingTurn]);

    clearTimeout(pending.current ?? undefined);
    pending.current = setTimeout(() => {
      const kind: Kind = requestFails(query) ? 'error' : (intent ?? routeIntent(query));
      const answer: Message = { id: nextId.current++, kind };
      setMessages((current) => [
        ...current.filter((message) => message.kind !== 'thinking'),
        answer,
      ]);
    }, LATENCY_MS);
  }, []);

  const reset = useCallback(() => {
    clearTimeout(pending.current ?? undefined);
    setMessages([]);
    setHistory(false);
    setDraft('');
    setFocused(false);
    setSheetOpen(false);
  }, []);

  /* 'sheet' chips open the options list; 'intent' chips answer straight away. */
  const onPickMode = useCallback(
    (prompt: StarterPrompt) => {
      if (prompt.mode === 'sheet') {
        setMode(prompt.label);
        setSheetOpen(true);
        setFocused(false);
        setDraft('');
        setMenuOpen(false);
        setVoiceOpen(false);
        return;
      }
      ask(prompt.label, prompt.intent);
    },
    [ask]
  );

  const addToBasket = useCallback(
    (label: string) => {
      setBasketCount((count) => count + 1);
      flash(`${label} added`);
    },
    [flash]
  );

  const onFollowUp = useCallback(
    (label: string) => {
      if (label === 'Add all to basket') {
        const items = recipeAnswer.basket.length;
        setBasketCount((count) => count + items);
        flash(`${items} items added to basket`);
        return;
      }
      ask(label);
    },
    [ask, flash]
  );

  const onReorder = useCallback(
    (order: Order) => flash(`Reordering from ${order.store}`),
    [flash]
  );

  const typing = focused && draft.trim().length > 0;

  const matches = useMemo(() => {
    if (!typing) return querySuggestions;
    const query = draft.trim().toLowerCase();
    return querySuggestions.filter((term) => term.includes(query)).slice(0, 6);
  }, [draft, typing]);

  const optionsOpen = !history && !voiceOpen && matches.length > 0 && (sheetOpen || typing);
  const sheetPrefix = sheetOpen ? mode : starterPrompts[0].label;
  const sheetIntent: Intent = sheetOpen
    ? (starterPrompts.find((p) => p.label === mode)?.intent ?? 'stores')
    : 'stores';

  const renderPayload = (message: Message) => {
    switch (message.kind) {
      case 'user':
        return <UserBubble text={message.text ?? ''} />;
      case 'thinking':
        return <Thinking />;
      case 'error':
        return <ErrorTurn onRetry={() => ask(lastQuery)} />;
      case 'recipe':
        return (
          <View style={styles.answer}>
            <AssistantText text={recipeAnswer.text} />
            <BasketCard onAdd={addToBasket} />
            <FollowUps items={recipeAnswer.followUps} onPress={onFollowUp} />
          </View>
        );
      case 'stores':
        return (
          <View style={styles.answer}>
            <AssistantText text={storeResults.reply} />
            <StoreCarousel stores={storeResults.stores} onAdd={addToBasket} />
            <FollowUps items={storeResults.followUps} onPress={onFollowUp} />
          </View>
        );
      case 'deals':
        return (
          <View style={styles.answer}>
            <AssistantText text={dealResults.reply} />
            <StoreCarousel stores={dealResults.stores} deals onAdd={addToBasket} />
            <FollowUps items={dealResults.followUps} onPress={onFollowUp} />
          </View>
        );
      case 'orders':
        return (
          <View style={styles.answer}>
            <AssistantText text={pastOrders.reply} />
            <OrderCards onReorder={onReorder} />
            <FollowUps items={pastOrders.followUps} onPress={onFollowUp} />
          </View>
        );
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />

      <KeyboardAvoidingView
        style={[styles.column, { paddingTop: insets.top }]}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Header
          onBack={() => (messages.length || history ? reset() : router.back())}
          onMenu={() => setMenuOpen(true)}
        />

        <ScrollView
          ref={scroller}
          style={styles.transcript}
          contentContainerStyle={styles.transcriptContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          accessibilityLiveRegion="polite">
          {history ? (
            <HistoryView
              cleared={historyCleared}
              onClearAll={() => {
                setHistoryCleared(true);
                flash('History cleared');
              }}
              onOpen={ask}
            />
          ) : (
            <>
              <Text style={styles.started}>Chat started · {startedAt}</Text>
              <Text style={styles.greeting}>{greeting(user.firstName)}</Text>
              <ModeChips dimmed={messages.length > 0} onPick={onPickMode} />
              {messages.map((message) => (
                <Animated.View key={message.id} entering={enterMessage}>
                  {renderPayload(message)}
                </Animated.View>
              ))}
            </>
          )}
        </ScrollView>

        {optionsOpen ? (
          <View style={styles.optionsSheet}>
            <OptionsSheet
              matches={matches}
              prefix={sheetPrefix}
              onDismiss={() => {
                setSheetOpen(false);
                setFocused(false);
                setDraft('');
              }}
              onSelect={(term) => ask(term, sheetIntent, `${sheetPrefix} ${term}`)}
            />
          </View>
        ) : null}

        <View style={styles.composer}>
          <Composer
            draft={draft}
            basketCount={basketCount}
            bottomInset={insets.bottom}
            onChangeDraft={setDraft}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onSend={() => ask(draft)}
            onVoice={() => {
              setFocused(false);
              setSheetOpen(false);
              setVoiceOpen(true);
            }}
            onBasket={() => flash(`Basket · ${basketCount} items`)}
          />
        </View>
      </KeyboardAvoidingView>

      {menuOpen ? (
        <OverflowMenu
          top={insets.top + 22}
          onDismiss={() => setMenuOpen(false)}
          onHistory={() => {
            setMenuOpen(false);
            setHistory(true);
          }}
          onNewChat={() => {
            setMenuOpen(false);
            reset();
          }}
          onClear={() => {
            setMenuOpen(false);
            reset();
            flash('Conversation cleared');
          }}
        />
      ) : null}

      {voiceOpen ? (
        <VoiceSheet
          onCancel={() => setVoiceOpen(false)}
          onStop={() => {
            setVoiceOpen(false);
            ask(voice.transcript);
          }}
        />
      ) : null}

      {toast ? <Toast message={toast} bottom={154 + insets.bottom} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.panel,
  },
  column: {
    flex: 1,
  },
  transcript: {
    flex: 1,
  },
  transcriptContent: {
    paddingHorizontal: Gutter,
    paddingTop: 8,
    paddingBottom: 10,
  },
  started: {
    fontFamily: Fonts.semibold,
    fontSize: 12,
    color: Colors.muted,
    textAlign: 'center',
    marginBottom: 16,
  },
  greeting: {
    fontFamily: Fonts.medium,
    fontSize: 21,
    lineHeight: 28.4,
    color: Colors.ink,
    marginBottom: 18,
  },
  answer: {
    gap: 12,
    marginBottom: 18,
  },
  optionsSheet: {
    position: 'absolute',
    top: 118,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 15,
  },
  composer: {
    zIndex: 20,
  },
});
