import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Layers, Filter, X, TrendingUp, Users, ShoppingBag, Target } from 'lucide-react';
import HexMap from './HexMap';

const categories = [
  'Рестораны',
  'Продукты',
  'Одежда',
  'Услуги',
  'Развлечения',
  'Красота',
  'Здоровье',
  'Спорт',
];

const hexSizes = [
  { value: 400, label: '400 м' },
  { value: 900, label: '900 м' },
  { value: 2400, label: '2.4 км' },
];

const timeRanges = [
  { value: '1m', label: 'Последний месяц' },
  { value: '3m', label: 'Последние 3 месяца' },
  { value: '6m', label: 'Последние 6 месяцев' },
  { value: '1y', label: 'Последний год' },
];

export default function MapView() {
  const [selectedCategory, setSelectedCategory] = useState('Рестораны');
  const [hexSize, setHexSize] = useState(900);
  const [timeRange, setTimeRange] = useState('3m');
  const [selectedHex, setSelectedHex] = useState<any>(null);
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="space-y-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-2xl text-slate-900 tracking-tight">Геоаналитика</h2>
          <p className="text-sm text-slate-500 mt-1">Интерактивная карта с гексагональными зонами</p>
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:shadow-md transition-all duration-200"
        >
          <Filter size={16} />
          <span className="text-sm">Фильтры</span>
        </button>
      </motion.div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4">
              {/* Category Selection */}
              <div>
                <label className="text-sm text-slate-700 mb-2 block">Категория</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                        selectedCategory === cat
                          ? 'bg-[#0079C1] text-white shadow-lg shadow-blue-500/20'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hex Size */}
              <div>
                <label className="text-sm text-slate-700 mb-2 block">Размер гекса</label>
                <div className="flex gap-2">
                  {hexSizes.map((size) => (
                    <button
                      key={size.value}
                      onClick={() => setHexSize(size.value)}
                      className={`flex-1 px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                        hexSize === size.value
                          ? 'bg-[#0079C1] text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Range */}
              <div>
                <label className="text-sm text-slate-700 mb-2 block">Период</label>
                <div className="grid grid-cols-4 gap-2">
                  {timeRanges.map((range) => (
                    <button
                      key={range.value}
                      onClick={() => setTimeRange(range.value)}
                      className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                        timeRange === range.value
                          ? 'bg-[#0079C1] text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-lg">
            <div className="p-4 border-b border-slate-200 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    placeholder="Поиск по адресу..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0079C1]/20 text-sm"
                  />
                </div>
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-white border border-slate-200 text-sm">
                  <Layers size={16} className="text-slate-500" />
                  <span className="text-slate-700">{selectedCategory}</span>
                </div>
              </div>
            </div>

            <HexMap
              category={selectedCategory}
              hexSize={hexSize}
              onHexSelect={setSelectedHex}
            />
          </div>
        </motion.div>

        {/* Side Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {/* Legend */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-lg">
            <h3 className="text-sm text-slate-700 mb-4 flex items-center gap-2">
              <div className="w-1 h-4 bg-[#0079C1] rounded" />
              Индекс активности
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-emerald-500" />
                  <span className="text-xs text-slate-600">Высокая</span>
                </div>
                <span className="text-xs text-slate-500">{'>'} 80%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-blue-500" />
                  <span className="text-xs text-slate-600">Средняя</span>
                </div>
                <span className="text-xs text-slate-500">50-80%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-amber-500" />
                  <span className="text-xs text-slate-600">Низкая</span>
                </div>
                <span className="text-xs text-slate-500">20-50%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-slate-300" />
                  <span className="text-xs text-slate-600">Очень низкая</span>
                </div>
                <span className="text-xs text-slate-500">{'<'} 20%</span>
              </div>
            </div>
          </div>

          {/* Hex Details */}
          <AnimatePresence mode="wait">
            {selectedHex ? (
              <motion.div
                key="hex-details"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-[#0079C1] to-[#005A94] text-white shadow-xl"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-base">Детали зоны</h3>
                  <button
                    onClick={() => setSelectedHex(null)}
                    className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Users size={16} className="text-white/70" />
                      <span className="text-xs text-white/70">Индекс Активного Интереса</span>
                    </div>
                    <div className="text-2xl">{selectedHex.activeInterest}%</div>
                    <div className="text-xs text-white/60 mt-1">
                      Доля клиентов с покупками в категории
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <ShoppingBag size={16} className="text-white/70" />
                      <span className="text-xs text-white/70">ATV Индекс</span>
                    </div>
                    <div className="text-2xl">{selectedHex.atv}</div>
                    <div className="text-xs text-white/60 mt-1">
                      Средний чек к городу
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Target size={16} className="text-white/70" />
                      <span className="text-xs text-white/70">Индекс Постоянника</span>
                    </div>
                    <div className="text-2xl">{selectedHex.loyalty}</div>
                    <div className="text-xs text-white/60 mt-1">
                      Частота визитов клиента
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp size={16} className="text-white/70" />
                      <span className="text-xs text-white/70">Доля Рынка</span>
                    </div>
                    <div className="text-2xl">{selectedHex.marketShare}%</div>
                    <div className="text-xs text-white/60 mt-1">
                      Доля клиентов ВТБ в гексе
                    </div>
                  </div>
                </div>

                <button className="w-full mt-4 px-4 py-3 bg-white text-[#0079C1] rounded-xl hover:shadow-lg transition-all duration-200">
                  Создать промо для зоны
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="hex-placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-slate-200 mx-auto mb-3 flex items-center justify-center">
                  <Layers size={20} className="text-slate-400" />
                </div>
                <p className="text-sm text-slate-600">
                  Выберите гекс на карте
                  <br />
                  для просмотра метрик
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
