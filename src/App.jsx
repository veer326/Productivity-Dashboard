import TodoList from './components/TodoList';
import CalendarWidget from './components/CalendarWidget';
import WeatherWidget from './components/WeatherWidget';
import QuoteWidget from './components/QuoteWidget';
import ThemeToggle from './components/ThemeToggle';

export default function App() {
  return (
    <div className="app">
      <ThemeToggle />
      <h1>🧠 Productivity Dashboard</h1>
      <div className="dashboard">
        <TodoList />
        <CalendarWidget />
        <WeatherWidget />
        <QuoteWidget />
      </div>
    </div>
  );
}
