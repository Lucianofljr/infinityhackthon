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
    } catch (err) {
      setError('Erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  };

  const themeClasses = isDark 
    ? 'bg-gray-900 text-white' 
    : 'bg-gradient-to-br from-purple-50 to-blue-50';

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
          <div className="mx-auto w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-2xl">∞</span>
          </div>
          <div>
            <CardTitle className="text-3xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
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
              <button className="text-sm text-purple-600 hover:text-purple-700">
                Esqueci a senha
              </button>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <Button 
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
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

export default LoginPage