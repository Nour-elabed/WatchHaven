import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { sellerGetProducts, sellerGetOrders, sellerDeleteProduct, type SellerOrder } from '@/services/sellerService';
import type { Product } from '@/types';
import { Spinner } from './ui/spinner';
import { toast } from 'sonner';
import AdminModal from '@/admin/components/AdminModal';
import ProductForm from '@/admin/components/ProductForm';
import { sellerUpdateProduct, sellerCreateProduct } from '@/services/sellerService';

const SellerDashboard = () => {
    const queryClient = useQueryClient();
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');

    const { data: products = [], isLoading: productsLoading } = useQuery<Product[]>({
        queryKey: ['seller-products'],
        staleTime: 0,
        queryFn: async () => (await sellerGetProducts()).data,
    });

    const { data: orders = [], isLoading: ordersLoading } = useQuery<SellerOrder[]>({
        queryKey: ['seller-orders'],
        staleTime: 0,
        queryFn: async () => (await sellerGetOrders()).data,
    });

    const deleteMutation = useMutation({
        mutationFn: sellerDeleteProduct,
        onSuccess: () => {
            toast.success('Product deleted');
            queryClient.invalidateQueries({ queryKey: ['seller-products'] });
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
        onError: () => toast.error('Failed to delete product'),
    });

    if (productsLoading || ordersLoading) {
        return <Spinner />;
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="flex gap-6">
                    <button 
                        onClick={() => setActiveTab('products')}
                        className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all ${activeTab === 'products' ? 'border-b-2 border-black text-black' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        My Products
                    </button>
                    <button 
                        onClick={() => setActiveTab('orders')}
                        className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all ${activeTab === 'orders' ? 'border-b-2 border-black text-black' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        My Sales
                    </button>
                </div>
                {activeTab === 'products' && (
                    <button onClick={() => setIsCreateOpen(true)} className="btn-primary py-2 text-xs">
                        Add Listing
                    </button>
                )}
            </div>

            {activeTab === 'products' ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {products.length > 0 ? products.map(product => (
                        <div key={product._id} className="bg-white border border-gray-100 rounded-3xl p-5 flex gap-4 hover:shadow-xl hover:shadow-gray-200/40 transition-all duration-300 group relative overflow-hidden">
                            <div className="relative w-24 h-24 shrink-0 overflow-hidden rounded-2xl bg-gray-50 border border-gray-100">
                                <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    onError={(e) => { e.currentTarget.src = "/assets/images/placeholder.svg" }}
                                />
                                <div className="absolute top-1 left-1">
                                    <span className={`px-1.5 py-0.5 rounded text-[7px] font-black uppercase tracking-tighter ${product.stock > 0 ? 'bg-black text-white' : 'bg-red-500 text-white'}`}>
                                        {product.stock > 0 ? `${product.stock} IN STOCK` : 'SOLD OUT'}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                                <div className="space-y-0.5">
                                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest truncate">{product.brand}</p>
                                    <h3 className="font-extrabold text-gray-900 text-base leading-tight group-hover:text-blue-600 transition-colors truncate">{product.name}</h3>
                                    <p className="text-xs text-gray-400 font-medium truncate italic">{product.category} Collection</p>
                                </div>
                                
                                <div className="flex items-center justify-between mt-3 gap-2">
                                    <p className="text-xl font-black text-gray-900 truncate">${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                                    <div className="flex gap-2 shrink-0">
                                        <button 
                                            onClick={() => setEditingProduct(product)} 
                                            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-600 hover:bg-black hover:text-white transition-all shadow-sm"
                                            title="Edit"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                                        </button>
                                        <button 
                                            onClick={() => { if(window.confirm('Delete this listing?')) deleteMutation.mutate(product._id) }} 
                                            className="w-8 h-8 flex items-center justify-center rounded-full bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-sm"
                                            title="Delete"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="col-span-full py-12 text-center text-muted-foreground">
                            No products listed yet.
                        </div>
                    )}
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.length > 0 ? orders.map(order => (
                        <div key={order._id} className="premium-card p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Order #{order._id.slice(-6).toUpperCase()}</p>
                                    <p className="text-sm font-bold mt-1">Buyer: {order.user.username}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-bold text-green-600">+${order.totalEarned.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                                    <span className="text-[10px] font-bold uppercase text-muted-foreground">{order.status}</span>
                                </div>
                            </div>
                            <div className="space-y-3">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between text-sm py-2 border-t border-gray-50">
                                        <div className="flex items-center gap-3">
                                            <span className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-[10px] font-bold">{item.quantity}x</span>
                                            <span className="font-medium">{item.name}</span>
                                        </div>
                                        <span className="font-bold">${(item.price * item.quantity).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )) : (
                        <div className="py-12 text-center text-muted-foreground">
                            No sales yet.
                        </div>
                    )}
                </div>
            )}

            <AdminModal title="Create Listing" isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)}>
                <ProductForm 
                    onSubmit={async (payload) => {
                        await sellerCreateProduct(payload);
                        toast.success('Product listed!');
                        setIsCreateOpen(false);
                        queryClient.invalidateQueries({ queryKey: ['seller-products'] });
                        queryClient.invalidateQueries({ queryKey: ['products'] });
                    }}
                />
            </AdminModal>

            <AdminModal title="Edit Listing" isOpen={Boolean(editingProduct)} onClose={() => setEditingProduct(null)}>
                <ProductForm 
                    initialValue={editingProduct}
                    onSubmit={async (payload) => {
                        if (!editingProduct) return;
                        await sellerUpdateProduct(editingProduct._id, payload);
                        toast.success('Product updated!');
                        setEditingProduct(null);
                        queryClient.invalidateQueries({ queryKey: ['seller-products'] });
                        queryClient.invalidateQueries({ queryKey: ['products'] });
                    }}
                />
            </AdminModal>
        </div>
    );
};

export default SellerDashboard;
