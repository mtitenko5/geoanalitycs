import { useState } from 'react';
import { motion } from 'motion/react';
import { Megaphone, Users, Calendar, DollarSign, Send, AlertCircle, CheckCircle2, Clock, Target } from 'lucide-react';

const mockCampaigns = [
  {
    id: 1,
    title: 'Скидка 20% на доставку',
    category: 'Рестораны',
    hexSize: 900,
    recipients: 2450,
    budget: 4900,
    status: 'active',
    sentDate: '2026-04-10',
    ctr: '8.5%',
  },
  {
    id: 2,
    title: 'Новое меню сезона',
    category: 'Рестораны',
    hexSize: 400,
    recipients: 850,
    budget: 1700,
    status: 'moderation',
    sentDate: null,
    ctr: null,
  },
  {
    id: 3,
    title: 'Бесплатная примерка',
    category: 'Одежда',
    hexSize: 2400,
    recipients: 5200,
    budget: 10400,
    status: 'completed',
    sentDate: '2026-04-01',
    ctr: '12.3%',
  },
];

export default function PromoView() {
  const [activeTab, setActiveTab] = useState<'create' | 'campaigns'>('create');
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    category: 'Рестораны',
    hexSize: 900,
    lastPurchase: 30,
    budget: 2000,
  });

  // Calculate estimated recipients based on hex size and last purchase
  const calculateRecipients = () => {
    const baseRecipients = {
      400: 500,
      900: 1500,
      2400: 4000,
    }[formData.hexSize] || 1500;

    const purchaseMultiplier = {
      7: 0.3,
      30: 0.6,
      90: 0.9,
      365: 1.2,
    }[formData.lastPurchase] || 0.6;

    return Math.floor(baseRecipients * purchaseMultiplier);
  };

  const estimatedRecipients = calculateRecipients();
  const minBudget = Math.ceil(estimatedRecipients * 0.8);
  const costPerPush = formData.budget / estimatedRecipients;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl text-slate-900 tracking-tight">Промо-кампании</h2>
        <p className="text-sm text-slate-500 mt-1">
          Создавайте таргетированные push-уведомления для клиентов ВТБ
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('create')}
          className={`px-6 py-3 text-sm transition-all duration-200 relative ${
            activeTab === 'create'
              ? 'text-[#0079C1]'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Создать промо
          {activeTab === 'create' && (
            <motion.div
              layoutId="activePromoTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0079C1]"
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab('campaigns')}
          className={`px-6 py-3 text-sm transition-all duration-200 relative ${
            activeTab === 'campaigns'
              ? 'text-[#0079C1]'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Мои кампании
          {activeTab === 'campaigns' && (
            <motion.div
              layoutId="activePromoTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0079C1]"
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
        </button>
      </div>

      {/* Create Promo Tab */}
      {activeTab === 'create' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Form */}
          <div className="lg:col-span-2 space-y-4">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-lg space-y-6">
              <div>
                <h3 className="text-lg text-slate-900 mb-4">Настройки кампании</h3>

                {/* Title */}
                <div className="mb-4">
                  <label className="text-sm text-slate-700 mb-2 block">
                    Название кампании
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Например: Скидка 20% на доставку"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0079C1]/20 text-sm"
                  />
                </div>

                {/* Message */}
                <div className="mb-4">
                  <label className="text-sm text-slate-700 mb-2 block">
                    Текст уведомления
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Введите текст push-уведомления..."
                    rows={4}
                    maxLength={200}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0079C1]/20 text-sm resize-none"
                  />
                  <div className="text-xs text-slate-500 mt-1 text-right">
                    {formData.message.length}/200 символов
                  </div>
                </div>

                {/* Category */}
                <div className="mb-4">
                  <label className="text-sm text-slate-700 mb-2 block">Категория</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0079C1]/20 text-sm bg-white"
                  >
                    <option>Рестораны</option>
                    <option>Продукты</option>
                    <option>Одежда</option>
                    <option>Услуги</option>
                    <option>Развлечения</option>
                    <option>Красота</option>
                    <option>Здоровье</option>
                    <option>Спорт</option>
                  </select>
                </div>

                {/* Hex Size */}
                <div className="mb-4">
                  <label className="text-sm text-slate-700 mb-2 block">
                    Размер зоны (гекс)
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[400, 900, 2400].map((size) => (
                      <button
                        key={size}
                        onClick={() => setFormData({ ...formData, hexSize: size })}
                        className={`px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                          formData.hexSize === size
                            ? 'bg-[#0079C1] text-white shadow-lg shadow-blue-500/20'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {size} м
                      </button>
                    ))}
                  </div>
                </div>

                {/* Last Purchase */}
                <div className="mb-4">
                  <label className="text-sm text-slate-700 mb-2 block">
                    Последняя покупка (дней назад)
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { value: 7, label: '7 дней' },
                      { value: 30, label: '30 дней' },
                      { value: 90, label: '90 дней' },
                      { value: 365, label: '1 год' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setFormData({ ...formData, lastPurchase: option.value })}
                        className={`px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                          formData.lastPurchase === option.value
                            ? 'bg-[#0079C1] text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label className="text-sm text-slate-700 mb-2 block">
                    Бюджет кампании (₽)
                  </label>
                  <input
                    type="range"
                    min={minBudget}
                    max={minBudget * 3}
                    step={100}
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-slate-500">Мин: {minBudget} ₽</span>
                    <span className="text-sm text-slate-900">{formData.budget} ₽</span>
                    <span className="text-xs text-slate-500">Макс: {minBudget * 3} ₽</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preview & Stats */}
          <div className="space-y-4">
            {/* Preview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 text-white shadow-xl"
            >
              <div className="text-xs text-slate-400 mb-4">ПРЕДПРОСМОТР УВЕДОМЛЕНИЯ</div>

              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0079C1] to-[#005A94] flex items-center justify-center flex-shrink-0">
                    <Megaphone size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm mb-1">ВТБ Бизнес Аналитика</div>
                    <div className="text-xs text-white/70">Сейчас</div>
                  </div>
                </div>
                <div className="text-sm leading-relaxed mt-3">
                  {formData.message || 'Ваше сообщение появится здесь...'}
                </div>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-lg space-y-4"
            >
              <h3 className="text-sm text-slate-700 mb-4">Прогноз кампании</h3>

              <div className="flex items-center justify-between p-4 rounded-xl bg-blue-50 border border-blue-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
                    <Users size={18} className="text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-600">Получателей</div>
                    <div className="text-xl text-slate-900">{estimatedRecipients.toLocaleString()}</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-emerald-50 border border-emerald-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center">
                    <DollarSign size={18} className="text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-600">Цена за push</div>
                    <div className="text-xl text-slate-900">{costPerPush.toFixed(2)} ₽</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-violet-50 border border-violet-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-violet-500 flex items-center justify-center">
                    <Target size={18} className="text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-600">Прогноз CTR</div>
                    <div className="text-xl text-slate-900">8-12%</div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 space-y-2">
                <div className="flex items-start gap-2 text-xs text-slate-600">
                  <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
                  <span>Не более 3 уведомлений в неделю на клиента</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-slate-600">
                  <Clock size={14} className="mt-0.5 flex-shrink-0" />
                  <span>Модерация занимает до 24 часов</span>
                </div>
              </div>

              <button
                className="w-full px-4 py-3 bg-gradient-to-r from-[#0079C1] to-[#00A0E3] text-white rounded-xl hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!formData.title || !formData.message}
              >
                <Send size={18} />
                Отправить на модерацию
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Campaigns Tab */}
      {activeTab === 'campaigns' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {mockCampaigns.map((campaign, index) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg text-slate-900 mb-1">{campaign.title}</h3>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <span>{campaign.category}</span>
                    <span>•</span>
                    <span>{campaign.hexSize} м</span>
                    <span>•</span>
                    <span>{campaign.recipients.toLocaleString()} получателей</span>
                  </div>
                </div>

                <div
                  className={`px-3 py-1.5 rounded-full text-xs flex items-center gap-2 ${
                    campaign.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : campaign.status === 'moderation'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {campaign.status === 'active' && <CheckCircle2 size={14} />}
                  {campaign.status === 'moderation' && <Clock size={14} />}
                  {campaign.status === 'active' && 'Активна'}
                  {campaign.status === 'moderation' && 'На модерации'}
                  {campaign.status === 'completed' && 'Завершена'}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 rounded-xl bg-slate-50">
                  <div className="text-xs text-slate-600 mb-1">Бюджет</div>
                  <div className="text-base text-slate-900">{campaign.budget.toLocaleString()} ₽</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50">
                  <div className="text-xs text-slate-600 mb-1">Дата отправки</div>
                  <div className="text-base text-slate-900">
                    {campaign.sentDate || '—'}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50">
                  <div className="text-xs text-slate-600 mb-1">CTR</div>
                  <div className="text-base text-slate-900">
                    {campaign.ctr || '—'}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
