import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { 
  Users, 
  CheckSquare, 
  User, 
  BookOpen, 
  LogOut, 
//   Calendar,
  Plus,
  Trash2,
  Edit,
  Bell,
  StickyNote,
  Moon,
  Sun,
  ExternalLink,
  Clock,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';

// Mock Authentication
const mockAuth = {
  login: (credentials) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (credentials.email && credentials.password) {
          const user = { 
            id: 1, 
            name: 'Ana Carolina Silva', 
            email: credentials.email,
            role: 'Coordenadora Pedagógica',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
            bio: 'Coordenadora pedagógica com 8 anos de experiência em educação infantil e ensino fundamental.',
            phone: '(81) 99999-9999'
          };
          resolve({ success: true, user, token: 'infinity-token-2024' });
        } else {
          resolve({ success: false, error: 'Credenciais inválidas' });
        }
      }, 1000);
    });
  }
};

// Theme Context
const useTheme = () => {
  const [isDark, setIsDark] = useState(false);
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('infinity-theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('infinity-theme', newTheme ? 'dark' : 'light');
  };

  return { isDark, toggleTheme };
};

// Login Page
function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { isDark, toggleTheme } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!email || !password) {
      setError('Email e senha são obrigatórios');
      setIsLoading(false);
      return;
    }

    try {
      const result = await mockAuth.login({ email, password });
      if (result.success) {
        onLogin(result.user, result.token);
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError('Erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  };

  const themeClasses = isDark 
    ? 'bg-gray-900 text-white' 
    : 'bg-gradient-to-br from-purple-50 to-red-50';

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${themeClasses}`}>
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          className="rounded-full"
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>

      <Card className={`w-full max-w-md ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
        <CardHeader className="text-center space-y-4">
          {/* Infinity School Logo */}
          <div className="mx-auto w-20 h-20 bg-gradient-to-r from-red-600 to-red-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-2xl">∞</span>
          </div>
          <div>
            <CardTitle className="text-3xl bg-gradient-to-r from-red-600 to-red-600 bg-clip-text text-transparent">
              Infinity School
            </CardTitle>
            <CardDescription className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              Sistema de Produtividade
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label className="font-medium">Email:</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@infinityschool.com.br"
                className="mt-2"
                required
              />
            </div>

            <div>
              <Label className="font-medium">Senha:</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                className="mt-2"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Lembrar-me</span>
              </label>
              <button className="text-sm from-red-600 to-red-600 hover:from-red-800 hover:to-red-800">
                Esqueci a senha
              </button>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <Button 
              className="w-full bg-gradient-to-r from-red-600 to-red-600 hover:from-red-800 hover:to-red-800 text-white"
              disabled={isLoading}
              onClick={handleSubmit}
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Calendar Component with Tasks
function InfinityCalendar({ tasks, onAddTask, onToggleTask, isDark }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newTask, setNewTask] = useState('');
  const [taskCategory, setTaskCategory] = useState('evento');
  const [showAddTask, setShowAddTask] = useState(false);

  const categories = {
    reuniao: { color: 'bg-red-500', label: 'Reunião' },
    entrega: { color: 'bg-yellow-500', label: 'Entrega' },
    evento: { color: 'bg-blue-500', label: 'Evento' }
  };

  const tasksForDate = tasks.filter(task => 
    task.date.toDateString() === selectedDate.toDateString()
  );

  const addTask = () => {
    if (newTask.trim()) {
      onAddTask({
        id: Date.now(),
        text: newTask,
        date: selectedDate,
        category: taskCategory,
        completed: false
      });
      setNewTask('');
      setShowAddTask(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar */}
        <Card className={isDark ? 'bg-gray-800 border-gray-700' : ''}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Calendário
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        {/* Tasks for Selected Date */}
        <Card className={isDark ? 'bg-gray-800 border-gray-700' : ''}>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>
                Tarefas - {selectedDate.toLocaleDateString('pt-BR')}
              </CardTitle>
              <Button
                size="sm"
                onClick={() => setShowAddTask(!showAddTask)}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Add Task Form */}
            {showAddTask && (
              <div className="space-y-3 p-3 border rounded-lg">
                <Input
                  placeholder="Nova tarefa..."
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                />
                <div className="flex gap-2">
                  <select 
                    value={taskCategory}
                    onChange={(e) => setTaskCategory(e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-md"
                  >
                    {Object.entries(categories).map(([key, cat]) => (
                      <option key={key} value={key}>{cat.label}</option>
                    ))}
                  </select>
                  <Button onClick={addTask} size="sm">Adicionar</Button>
                </div>
              </div>
            )}

            {/* Task List */}
            <div className="space-y-2">
              {tasksForDate.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  Nenhuma tarefa para este dia
                </p>
              ) : (
                tasksForDate.map(task => (
                  <div 
                    key={task.id}
                    className="flex items-center gap-3 p-3 border rounded-lg"
                  >
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => onToggleTask(task.id)}
                      className="rounded"
                    />
                    <div className={`w-3 h-3 rounded-full ${categories[task.category].color}`} />
                    <span className={task.completed ? 'line-through text-gray-500' : ''}>
                      {task.text}
                    </span>
                    <Badge variant="outline" className="ml-auto">
                      {categories[task.category].label}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Notes Component
function NotesSection({ notes, onAddNote, onDeleteNote, isDark }) {
  const [newNote, setNewNote] = useState('');

  const addNote = () => {
    if (newNote.trim()) {
      onAddNote({
        id: Date.now(),
        text: newNote,
        date: new Date(),
        color: ['bg-yellow-200', 'bg-blue-200', 'bg-green-200', 'bg-pink-200'][Math.floor(Math.random() * 4)]
      });
      setNewNote('');
    }
  };

  return (
    <Card className={isDark ? 'bg-gray-800 border-gray-700' : ''}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <StickyNote className="h-5 w-5" />
          Anotações Rápidas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Nova anotação..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="flex-1"
            />
            <Button onClick={addNote} className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {notes.map(note => (
              <div 
                key={note.id}
                className={`p-3 rounded-lg shadow-sm relative ${note.color} ${isDark ? 'text-gray-900' : ''}`}
              >
                <button
                  onClick={() => onDeleteNote(note.id)}
                  className="absolute top-1 right-1 text-gray-600 hover:text-red-600"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
                <p className="text-sm pr-6">{note.text}</p>
                <p className="text-xs text-gray-600 mt-2">
                  {note.date.toLocaleDateString('pt-BR')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// User Profile Component
function ProfilePage({ user, isDark }) {
  return (
    <div className="space-y-6">
      <Card className={isDark ? 'bg-gray-800 border-gray-700' : ''}>
        <CardHeader>
          <CardTitle>Perfil do Usuário</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-xl">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-2xl font-bold">{user.name}</h3>
                <p className="text-purple-600 font-medium">{user.role}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span>{user.phone}</span>
                </div>
              </div>
              
              <div>
                <Label className="font-medium">Bio:</Label>
                <p className="mt-1 text-gray-600">{user.bio}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Main Dashboard
function Dashboard({ user, onLogout }) {
  const { isDark, toggleTheme } = useTheme();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'Reunião com pais - Turma A',
      date: new Date(),
      category: 'reuniao',
      completed: false
    },
    {
      id: 2,
      text: 'Entrega do planejamento mensal',
      date: new Date(Date.now() + 86400000),
      category: 'entrega',
      completed: false
    }
  ]);
  const [notes, setNotes] = useState([
    {
      id: 1,
      text: 'Lembrar de imprimir as atividades para amanhã',
      date: new Date(),
      color: 'bg-yellow-200'
    }
  ]);
  const [notifications] = useState([
    { id: 1, text: 'Reunião em 30 minutos', time: '14:30' },
    { id: 2, text: 'Planejamento pendente', time: 'Hoje' }
  ]);

  const dashboardOptions = [
    {
      id: 'pedagogico',
      title: 'Planejamento Pedagógico',
      description: 'Acesse a planilha no Google Drive',
      icon: BookOpen,
      color: 'from-green-500 to-green-600',
      external: true,
      url: 'https://docs.google.com/spreadsheets'
    },
    {
      id: 'chamada',
      title: 'Chamada',
      description: 'Controle de presença dos alunos',
      icon: CheckSquare,
      color: 'from-blue-500 to-blue-600',
      external: true,
      url: 'https://docs.google.com/spreadsheets'
    },
    {
      id: 'portal',
      title: 'Portal do Aluno',
      description: 'Sistema acadêmico',
      icon: Users,
      color: 'from-purple-500 to-purple-600',
      external: true,
      url: '#'
    },
    {
      id: 'app',
      title: 'Infinity App',
      description: 'Aplicativo móvel da escola',
      icon: User,
      color: 'from-orange-500 to-orange-600',
      external: true,
      url: '#'
    }
  ];

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? {...task, completed: !task.completed} : task
    ));
  };

  const addNote = (note) => {
    setNotes([...notes, note]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleExternalLink = (url) => {
    window.open(url, '_blank');
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'calendar':
        return (
          <InfinityCalendar
            tasks={tasks}
            onAddTask={addTask}
            onToggleTask={toggleTask}
            isDark={isDark}
          />
        );
      case 'profile':
        return <ProfilePage user={user} isDark={isDark} />;
      default:
        return (
          <div className="space-y-6">
            {/* Welcome Section */}
            <Card className={`${isDark ? 'bg-gray-800 border-gray-700' : ''} bg-gradient-to-r from-purple-50 to-blue-50`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">Bem-vinda, {user.name}!</h2>
                    <p className="text-gray-600 mt-1">
                      Hoje é {new Date().toLocaleDateString('pt-BR', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-purple-600" />
                    <Badge variant="secondary">{notifications.length}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dashboard Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dashboardOptions.map(option => {
                const IconComponent = option.icon;
                return (
                  <Card
                    key={option.id}
                    className={`${isDark ? 'bg-gray-800 border-gray-700' : ''} cursor-pointer transition-all hover:scale-105 hover:shadow-lg`}
                    onClick={() => option.external ? handleExternalLink(option.url) : setCurrentPage(option.id)}
                  >
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${option.color} flex items-center justify-center mb-4`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{option.title}</h3>
                          <p className="text-gray-600 text-sm">{option.description}</p>
                        </div>
                        {option.external && <ExternalLink className="h-4 w-4 text-gray-400" />}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Quick Access */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Tasks */}
              <Card className={isDark ? 'bg-gray-800 border-gray-700' : ''}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Próximas Tarefas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {tasks.slice(0, 3).map(task => (
                      <div key={task.id} className="flex items-center gap-3 p-2 border rounded">
                        <div className={`w-3 h-3 rounded-full ${
                          task.category === 'reuniao' ? 'bg-red-500' :
                          task.category === 'entrega' ? 'bg-yellow-500' : 'bg-blue-500'
                        }`} />
                        <span className="flex-1">{task.text}</span>
                        <span className="text-xs text-gray-500">
                          {task.date.toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setCurrentPage('calendar')}
                    >
                      Ver Calendário Completo
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card className={isDark ? 'bg-gray-800 border-gray-700' : ''}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notificações
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {notifications.map(notification => (
                      <div key={notification.id} className="flex items-center gap-3 p-2 border rounded">
                        <div className="w-2 h-2 bg-purple-500 rounded-full" />
                        <span className="flex-1">{notification.text}</span>
                        <span className="text-xs text-gray-500">{notification.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  const themeClasses = isDark 
    ? 'bg-gray-900 text-white' 
    : 'bg-gray-50';

  return (
    <div className={`min-h-screen ${themeClasses}`}>
      {/* Header */}
      <header className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'} border-b px-6 py-4`}>
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">∞</span>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-red-600 to-red-600 bg-clip-text text-transparent">
                Infinity School
              </h1>
              <p className="text-sm text-gray-500">Sistema de Produtividade</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => setCurrentPage('calendar')}
              className={currentPage === 'calendar' ? 'bg-purple-100 text-purple-700' : ''}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Calendário
            </Button>
            
            <Button
              variant="ghost"
              onClick={() => setCurrentPage('profile')}
              className={currentPage === 'profile' ? 'bg-purple-100 text-purple-700' : ''}
            >
              <User className="h-4 w-4 mr-2" />
              Perfil
            </Button>

            {currentPage !== 'dashboard' && (
              <Button
                variant="outline"
                onClick={() => setCurrentPage('dashboard')}
              >
                Dashboard
              </Button>
            )}

            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4" />
              <Switch checked={isDark} onCheckedChange={toggleTheme} />
              <Moon className="h-4 w-4" />
            </div>

            <Avatar className="cursor-pointer" onClick={() => setCurrentPage('profile')}>
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>

            <Button
              variant="outline"
              onClick={onLogout}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        {renderContent()}
        
        {/* Notes Section - Always visible at bottom */}
        {currentPage === 'dashboard' && (
          <div className="mt-8">
            <NotesSection
              notes={notes}
              onAddNote={addNote}
              onDeleteNote={deleteNote}
              isDark={isDark}
            />
          </div>
        )}
      </main>
    </div>
  );
}

// Main App
function MainApp() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('infinity-token');
    const storedUser = localStorage.getItem('infinity-user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('infinity-token', authToken);
    localStorage.setItem('infinity-user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('infinity-token');
    localStorage.removeItem('infinity-user');
  };

  if (user && token) {
    return <Dashboard user={user} onLogout={handleLogout} />;
  }

  return <LoginPage onLogin={handleLogin} />;
}

export default MainApp;