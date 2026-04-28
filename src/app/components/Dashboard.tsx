import { motion } from 'motion/react';
import { TrendingUp, Users, ShoppingBag, Target, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router';
import { AreaChart, Area, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const trendData = [
  { month: 'Янв', value: 65 },
  { month: 'Фев', value: 72 },
  { month: 'Мар', value: 68 },
  { month: 'Апр', value: 85 },
  { month: 'Май', value: 92 },
  { month: 'Июн', value: 88 },
];

const categoryData = [
  { name: 'Рестораны', value: 145 },
  { name: 'Продукты', value: 128 },
  { name: 'Одежда', value: 95 },
  { name: 'Услуги', value: 82 },
  { name: 'Развлечения', value: 67 },
];

export default function Dashboard() {
  const stats = [
    {
      label: 'Индекс Активного Интереса',
      value: '87.2',
      change: '+12.3%',
      trend: 'up',
      icon: Users,
      color: 'blue',
      description: 'Доля клиентов с покупками'
    },
    {
      label: 'ATV Индекс',
      value: '1.45',
      change: '+8.1%',
      trend: 'up',
      icon: ShoppingBag,
      color: 'emerald',
      description: 'Средний чек к городу'
    },
    {
      label: 'Индекс Постоянника',
      value: '3.8',
      change: '+15.7%',
      trend: 'up',
      icon: Target,
      color: 'violet',
      description: 'Частота визитов клиента'
    },
    {
      label: 'Доля Рынка',
      value: '24.6%',
      change: '+5.2%',
      trend: 'up',
      icon: TrendingUp,
      color: 'amber',
      description: 'Доля клиентов ВТБ в гексе'
    },
  ];

  const colorMap = {
    blue: { bg: 'from-blue-500/10 to-blue-600/5', border: 'border-blue-500/20', text: 'text-blue-600', accent: 'bg-blue-500' },
    emerald: { bg: 'from-emerald-500/10 to-emerald-600/5', border: 'border-emerald-500/20', text: 'text-emerald-600', accent: 'bg-emerald-500' },
    violet: { bg: 'from-violet-500/10 to-violet-600/5', border: 'border-violet-500/20', text: 'text-violet-600', accent: 'bg-violet-500' },
    amber: { bg: 'from-amber-500/10 to-amber-600/5', border: 'border-amber-500/20', text: 'text-amber-600', accent: 'bg-amber-500' },
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0079C1] via-[#005A94] to-[#003D66] p-8 shadow-2xl shadow-blue-500/20"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl" />

        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs mb-4">
                <Sparkles size={12} />
                <span>Премиум инструмент для МСП</span>
              </div>
              <h2 className="text-3xl text-white mb-3 tracking-tight">
                Узнайте, где ваши клиенты, <br />
                <span className="text-white/80">что они покупают и как их вернуть</span>
              </h2>
              <p className="text-white/70 text-base leading-relaxed mb-6">
                Геолокационная аналитика на основе анонимизированных транзакций
                клиентов ВТБ. Находите зоны роста и запускайте таргетированные промо-кампании.
              </p>
              <div className="flex gap-3">
                <Link
                  to="/map"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0079C1] rounded-xl hover:shadow-lg transition-all duration-200"
                >
                  <span>Открыть карту</span>
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/promo"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all duration-200"
                >
                  <span>Создать промо</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const colors = colorMap[stat.color as keyof typeof colorMap];
          const Icon = stat.icon;

          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`relative group p-6 rounded-2xl bg-gradient-to-br ${colors.bg} border ${colors.border} backdrop-blur-sm hover:shadow-lg transition-all duration-300`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-2.5 rounded-xl ${colors.accent} bg-opacity-10`}>
                  <Icon className={colors.text} size={20} />
                </div>
                <div className="text-right">
                  <div className={`text-xs ${colors.text} bg-white/80 px-2 py-1 rounded-full`}>
                    {stat.change}
                  </div>
                </div>
              </div>

              <div className="text-3xl text-slate-900 mb-1 tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm text-slate-600 mb-1">{stat.label}</div>
              <div className="text-xs text-slate-500">{stat.description}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trend Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg"
        >
          <div className="mb-6">
            <h3 className="text-lg text-slate-900 mb-1">Динамика активности</h3>
            <p className="text-sm text-slate-500">Индекс активного интереса по месяцам</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0079C1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0079C1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke="#0079C1"
                strokeWidth={2}
                fill="url(#colorValue)"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '8px 12px'
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Category Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg"
        >
          <div className="mb-6">
            <h3 className="text-lg text-slate-900 mb-1">Топ категорий</h3>
            <p className="text-sm text-slate-500">По количеству транзакций (индекс)</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={categoryData}>
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '8px 12px'
                }}
              />
              <Bar dataKey="value" fill="#0079C1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100">
          <h4 className="text-slate-900 mb-2">📍 Гексагональная аналитика</h4>
          <p className="text-sm text-slate-600 mb-4">Зоны 400м, 900м и 2.4км с детальными метриками</p>
          <Link to="/map" className="text-sm text-[#0079C1] hover:underline inline-flex items-center gap-1">
            Исследовать карту <ArrowRight size={14} />
          </Link>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-100">
          <h4 className="text-slate-900 mb-2">📢 Push-уведомления</h4>
          <p className="text-sm text-slate-600 mb-4">Таргетированная рассылка клиентам в выбранных гексах</p>
          <Link to="/promo" className="text-sm text-[#0079C1] hover:underline inline-flex items-center gap-1">
            Запустить промо <ArrowRight size={14} />
          </Link>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-100">
          <h4 className="text-slate-900 mb-2">🎯 Целевая аудитория</h4>
          <p className="text-sm text-slate-600 mb-4">До 3 уведомлений в неделю с автоматическим аукционом</p>
          <span className="text-sm text-slate-500">Баланс: 24 500 ₽</span>
        </div>
      </motion.div>
    </div>
  );
}
