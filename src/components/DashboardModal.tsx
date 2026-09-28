import React, { useState, useMemo } from 'react';
import {
  X,
  BarChart3,
  Package,
  Wrench,
  ShieldCheck,
  TrendingUp,
  Boxes,
  PieChart as PieChartIcon,
  Layers,
  ArrowRight,
  Filter,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart,
  Pie,
  Legend,
  CartesianGrid,
} from 'recharts';
import { Product, ServicePillar, CategoryType } from '../types';

interface DashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  services: ServicePillar[];
  onSelectCategory?: (category: CategoryType) => void;
  onOpenAddProduct?: () => void;
  onOpenAddService?: () => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  laptops: '#0284c7', // Sky 600
  desktops: '#3b82f6', // Blue 500
  printers: '#6366f1', // Indigo 500
  cctv: '#f97316', // Orange 500
  accessories: '#10b981', // Emerald 500
  amc: '#8b5cf6', // Purple 500
};

const CATEGORY_LABELS: Record<string, string> = {
  laptops: 'Laptops',
  desktops: 'Desktops & Rigs',
  printers: 'Epson Printers',
  cctv: 'CCTV & Security',
  accessories: 'Accessories',
  amc: 'AMC Contracts',
};

export const DashboardModal: React.FC<DashboardModalProps> = ({
  isOpen,
  onClose,
  products,
  services,
  onSelectCategory,
  onOpenAddProduct,
  onOpenAddService,
}) => {
  const [selectedBarCategory, setSelectedBarCategory] = useState<string | null>(null);

  // 1. Overall Key Metrics
  const metrics = useMemo(() => {
    const totalProducts = products.length;
    const inStockProducts = products.filter((p) => p.inStock).length;
    const outOfStockProducts = totalProducts - inStockProducts;
    const protectedProducts = products.filter((p) => p.protected).length;
    const totalServices = services.length;
    const protectedServices = services.filter((s) => s.protected).length;

    // Total Inventory Value
    const totalValuation = products.reduce((acc, p) => acc + (p.price || 0), 0);
    const avgPrice = totalProducts > 0 ? Math.round(totalValuation / totalProducts) : 0;

    return {
      totalProducts,
      inStockProducts,
      outOfStockProducts,
      protectedProducts,
      totalServices,
      protectedServices,
      totalValuation,
      avgPrice,
    };
  }, [products, services]);

  // 2. Inventory by Category Data
  const categoryData = useMemo(() => {
    const counts: Record<string, { count: number; inStock: number; totalValue: number }> = {
      laptops: { count: 0, inStock: 0, totalValue: 0 },
      desktops: { count: 0, inStock: 0, totalValue: 0 },
      printers: { count: 0, inStock: 0, totalValue: 0 },
      cctv: { count: 0, inStock: 0, totalValue: 0 },
      accessories: { count: 0, inStock: 0, totalValue: 0 },
      amc: { count: 0, inStock: 0, totalValue: 0 },
    };

    products.forEach((p) => {
      const cat = p.category || 'laptops';
      if (!counts[cat]) {
        counts[cat] = { count: 0, inStock: 0, totalValue: 0 };
      }
      counts[cat].count += 1;
      if (p.inStock) counts[cat].inStock += 1;
      counts[cat].totalValue += p.price || 0;
    });

    const list = Object.entries(counts).map(([key, val]) => ({
      key,
      name: CATEGORY_LABELS[key] || key,
      count: val.count,
      inStock: val.inStock,
      totalValue: val.totalValue,
      color: CATEGORY_COLORS[key] || '#64748b',
      percentage: products.length > 0 ? Math.round((val.count / products.length) * 100) : 0,
    }));

    // Sort descending by count so admin immediately sees highest inventory category
    return list.sort((a, b) => b.count - a.count);
  }, [products]);

  // 3. Service Pillars breakdown
  const serviceActivityData = useMemo(() => {
    return services.map((s, index) => {
      const featureCount = Array.isArray(s.features) ? s.features.length : 0;
      return {
        id: s.id,
        name: s.title.length > 18 ? s.title.slice(0, 18) + '...' : s.title,
        fullName: s.title,
        features: featureCount,
        priceEstimate: s.priceEstimate,
        protected: !!s.protected,
        color: index % 2 === 0 ? '#0284c7' : '#f97316',
      };
    });
  }, [services]);

  // 4. Top Brands by Inventory Count
  const brandData = useMemo(() => {
    const brandsMap: Record<string, number> = {};
    products.forEach((p) => {
      const b = (p.brand || 'Unbranded').trim();
      brandsMap[b] = (brandsMap[b] || 0) + 1;
    });
    return Object.entries(brandsMap)
      .map(([brand, count]) => ({ brand, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  }, [products]);

  if (!isOpen) return null;

  const highestCategory = categoryData[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-4 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4.5 bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white flex items-center justify-between border-b border-sky-800/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400 shadow-inner">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold font-heading text-white">
                  Store Inventory &amp; Analytics Dashboard
                </h2>
                <span className="text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  Live View
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Visual analysis of stock count, category distributions, brand shares, and service pillars
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
            aria-label="Close Dashboard"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Dashboard Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 bg-slate-50/50">
          {/* Top Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                <span>Total Products</span>
                <Package className="w-4 h-4 text-sky-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading mt-1">
                {metrics.totalProducts}
              </div>
              <div className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>{metrics.inStockProducts} In Stock</span>
                {metrics.outOfStockProducts > 0 && (
                  <span className="text-amber-600">· {metrics.outOfStockProducts} Out</span>
                )}
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                <span>Top Category</span>
                <Boxes className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-slate-900 font-heading mt-1 truncate">
                {highestCategory ? highestCategory.name : 'None'}
              </div>
              <div className="text-[11px] text-slate-500 font-medium mt-1">
                {highestCategory
                  ? `${highestCategory.count} items (${highestCategory.percentage}% of stock)`
                  : 'No items'}
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                <span>Service Activity</span>
                <Wrench className="w-4 h-4 text-orange-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading mt-1">
                {metrics.totalServices}
              </div>
              <div className="text-[11px] text-slate-500 font-medium mt-1">
                Active service pillars in Ballari
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                <span>Catalog Valuation</span>
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-slate-900 font-heading mt-1">
                ₹{metrics.totalValuation.toLocaleString('en-IN')}
              </div>
              <div className="text-[11px] text-slate-500 font-medium mt-1">
                Avg price: ₹{metrics.avgPrice.toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          {/* Insights Banner */}
          {highestCategory && (
            <div className="bg-gradient-to-r from-sky-50 via-indigo-50/40 to-blue-50 border border-sky-200/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start sm:items-center gap-3">
                <div className="p-2 bg-sky-600 text-white rounded-xl shrink-0 shadow-xs">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-sky-950 font-heading">
                    Inventory Leader:{' '}
                    <span className="text-sky-700">{highestCategory.name}</span> currently holds the largest share ({highestCategory.count} items)
                  </h4>
                  <p className="text-xs text-sky-800/80 mt-0.5">
                    Total inventory value for {highestCategory.name}: ₹
                    {highestCategory.totalValue.toLocaleString('en-IN')}.
                  </p>
                </div>
              </div>

              {onSelectCategory && (
                <button
                  onClick={() => {
                    onSelectCategory(highestCategory.key as CategoryType);
                    onClose();
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer shrink-0 self-start sm:self-auto"
                >
                  <span>Filter {highestCategory.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          {/* Charts Row: Bar Chart & Pie Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Category Inventory Volume (Bar Chart) */}
            <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-heading flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-sky-600" />
                    <span>Inventory Count by Category</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Which categories have the most products available in store
                  </p>
                </div>
                <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-lg">
                  Units
                </span>
              </div>

              {/* Bar Chart Container */}
              <div className="h-64 sm:h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={categoryData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
                    onClick={(data: any) => {
                      if (data && data.activePayload && data.activePayload[0]) {
                        const clickedKey = data.activePayload[0].payload.key;
                        setSelectedBarCategory(clickedKey);
                      }
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 11, fill: '#64748b' }}
                      tickLine={false}
                      axisLine={{ stroke: '#cbd5e1' }}
                      interval={0}
                      angle={-15}
                      textAnchor="end"
                    />
                    <YAxis
                      allowDecimals={false}
                      tick={{ fontSize: 11, fill: '#64748b' }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      cursor={{ fill: '#f8fafc' }}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const item = payload[0].payload;
                          return (
                            <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl text-xs space-y-1">
                              <div className="font-bold text-sky-400">{item.name}</div>
                              <div>
                                Inventory Count: <span className="font-bold text-white">{item.count} items</span>
                              </div>
                              <div className="text-slate-300">
                                In Stock: <span className="text-emerald-400 font-semibold">{item.inStock}</span>
                              </div>
                              <div className="text-slate-300">
                                Category Value: <span className="font-semibold text-white">₹{item.totalValue.toLocaleString('en-IN')}</span>
                              </div>
                              <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-700">
                                Click bar to filter store catalog
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar
                      dataKey="count"
                      radius={[6, 6, 0, 0]}
                      className="cursor-pointer"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                          opacity={selectedBarCategory && selectedBarCategory !== entry.key ? 0.4 : 1}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Quick Category Action Chips */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-xs">
                <span className="text-slate-400 text-[11px] font-semibold mr-1 flex items-center gap-1">
                  <Filter className="w-3 h-3" /> Filter store:
                </span>
                {categoryData.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => {
                      if (onSelectCategory) {
                        onSelectCategory(cat.key as CategoryType);
                        onClose();
                      }
                    }}
                    className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-sky-100 hover:text-sky-700 text-slate-700 font-medium transition-colors cursor-pointer text-[11px] flex items-center gap-1.5"
                  >
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: cat.color }}
                    />
                    <span>{cat.name} ({cat.count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Category Share (Pie Chart) */}
            <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 font-heading flex items-center gap-2">
                  <PieChartIcon className="w-4 h-4 text-indigo-600" />
                  <span>Category Inventory Share</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Percentage breakdown of total store merchandise
                </p>
              </div>

              {/* Pie Chart */}
              <div className="h-56 sm:h-64 w-full my-2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const item = payload[0].payload;
                          return (
                            <div className="bg-slate-900 text-white p-2.5 rounded-xl shadow-xl text-xs space-y-0.5">
                              <div className="font-bold text-sky-400">{item.name}</div>
                              <div>
                                Share: <span className="font-bold text-white">{item.percentage}%</span> ({item.count} items)
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Pie
                      data={categoryData}
                      dataKey="count"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={75}
                      paddingAngle={4}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`pie-cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend
                      iconSize={8}
                      iconType="circle"
                      wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Protected Items Status Notice */}
              <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    <strong>{metrics.protectedProducts}</strong> items protected from sync overwrites
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row: Service Activity Overview & Top Brands */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Service Activity Breakdown */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-heading flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-orange-500" />
                    <span>Active Service Pillars</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Repair and maintenance offerings available to Ballari customers
                  </p>
                </div>
                {onOpenAddService && (
                  <button
                    onClick={() => {
                      onOpenAddService();
                      onClose();
                    }}
                    className="text-xs font-bold text-sky-600 hover:text-sky-700 hover:underline cursor-pointer"
                  >
                    + Add Service
                  </button>
                )}
              </div>

              <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                {serviceActivityData.map((serv) => (
                  <div
                    key={serv.id}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs hover:bg-slate-100/70 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <div className="w-7 h-7 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs shrink-0">
                        <Wrench className="w-3.5 h-3.5" />
                      </div>
                      <div className="truncate">
                        <div className="font-bold text-slate-900 truncate">{serv.fullName}</div>
                        <div className="text-[11px] text-slate-500">
                          {serv.features} feature details · {serv.priceEstimate}
                        </div>
                      </div>
                    </div>

                    {serv.protected && (
                      <span className="shrink-0 text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded border border-amber-200">
                        Protected
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Top Brands Representation */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-heading flex items-center gap-2">
                    <Layers className="w-4 h-4 text-sky-600" />
                    <span>Top Brand Representation</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Leading manufacturers in your current store stock
                  </p>
                </div>
                {onOpenAddProduct && (
                  <button
                    onClick={() => {
                      onOpenAddProduct();
                      onClose();
                    }}
                    className="text-xs font-bold text-sky-600 hover:text-sky-700 hover:underline cursor-pointer"
                  >
                    + Add Product
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {brandData.map((b) => {
                  const percentage = products.length > 0 ? Math.round((b.count / products.length) * 100) : 0;
                  return (
                    <div key={b.brand} className="space-y-1 text-xs">
                      <div className="flex justify-between font-medium">
                        <span className="text-slate-800 font-semibold">{b.brand}</span>
                        <span className="text-slate-500">
                          {b.count} models ({percentage}%)
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-sky-600 transition-all duration-500"
                          style={{ width: `${Math.min(percentage * 2, 100)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 bg-slate-100 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Total active catalog records: <strong>{products.length + services.length}</strong> items
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
