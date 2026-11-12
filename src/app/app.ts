import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Feature {
  id: number;
  category: 'core' | 'perf' | 'tooling';
  title: string;
  description: string;
  icon: string;
  badge: string;
}

interface DemoItem {
  id: number;
  title: string;
  done: boolean;
}

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // Mobile menu state
  readonly isMenuOpen = signal<boolean>(false);

  // Active filter tab for features
  readonly selectedCategory = signal<'all' | 'core' | 'perf' | 'tooling'>('all');

  // Interactive Counter demo using Signals
  readonly counter = signal<number>(5);
  readonly doubledCounter = computed(() => this.counter() * 2);

  // Feature cards data
  readonly features = signal<Feature[]>([
    {
      id: 1,
      category: 'core',
      title: 'Signals & Fine-Grained Reactivity',
      description: 'Zero-overhead reactivity with signals. State updates trigger surgical DOM updates.',
      icon: '⚡',
      badge: 'Signals',
    },
    {
      id: 2,
      category: 'core',
      title: 'Standalone Components',
      description: 'No NgModules needed. Simplified mental model with self-contained imports.',
      icon: '🧩',
      badge: 'Standalone',
    },
    {
      id: 3,
      category: 'perf',
      title: 'Built-in Control Flow',
      description: 'Declarative @if, @for, and @switch templates with blazing fast rendering.',
      icon: '🚀',
      badge: 'Fast',
    },
    {
      id: 4,
      category: 'perf',
      title: 'Vite & esbuild Architecture',
      description: 'Lightning-fast hot module replacement (HMR) and instantaneous builds.',
      icon: '🔥',
      badge: 'Builds',
    },
    {
      id: 5,
      category: 'tooling',
      title: 'TypeScript Native',
      description: 'Strict type safety end-to-end across components, services, and templates.',
      icon: '🛡️',
      badge: 'TypeScript',
    },
    {
      id: 6,
      category: 'tooling',
      title: 'Modern SSR & Hydration',
      description: 'Non-destructive event replay and server-side rendering support out of the box.',
      icon: '🌐',
      badge: 'Hydration',
    },
  ]);

  // Filtered features computed signal
  readonly filteredFeatures = computed(() => {
    const cat = this.selectedCategory();
    if (cat === 'all') return this.features();
    return this.features().filter((f) => f.category === cat);
  });

  // Interactive mini task list
  readonly newTodoText = signal<string>('');
  readonly todoList = signal<DemoItem[]>([
    { id: 1, title: 'Learn Angular Signals', done: true },
    { id: 2, title: 'Build clean component hierarchy', done: true },
    { id: 3, title: 'Deploy high-performance web app', done: false },
  ]);

  readonly completedCount = computed(() => this.todoList().filter((t) => t.done).length);

  // Newsletter subscription state
  readonly subscriberEmail = signal<string>('');
  readonly subscriptionStatus = signal<'idle' | 'success' | 'error'>('idle');

  toggleMenu() {
    this.isMenuOpen.update((v) => !v);
  }

  setCategory(cat: 'all' | 'core' | 'perf' | 'tooling') {
    this.selectedCategory.set(cat);
  }

  increment() {
    this.counter.update((c) => c + 1);
  }

  decrement() {
    this.counter.update((c) => (c > 0 ? c - 1 : 0));
  }

  toggleTodo(id: number) {
    this.todoList.update((items) =>
      items.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  }

  addTodo() {
    const text = this.newTodoText().trim();
    if (!text) return;
    this.todoList.update((items) => [
      ...items,
      { id: Date.now(), title: text, done: false },
    ]);
    this.newTodoText.set('');
  }

  deleteTodo(id: number) {
    this.todoList.update((items) => items.filter((item) => item.id !== id));
  }

  subscribeNewsletter() {
    const email = this.subscriberEmail().trim();
    if (email && email.includes('@')) {
      this.subscriptionStatus.set('success');
      this.subscriberEmail.set('');
      setTimeout(() => this.subscriptionStatus.set('idle'), 4000);
    } else {
      this.subscriptionStatus.set('error');
    }
  }
}
