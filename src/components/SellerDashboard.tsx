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
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {products.length > 0 ? products.map(product => (
                        <div key={product._id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 group">
                            {/* Product Image */}
                            <div className="relative h-64 overflow-hidden bg-gray-50">
                                <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    onError={(e) => { e.currentTarget.src = "/assets/images/placeholder.svg" }}
                                />
                                <div className="absolute top-3 left-3">
                                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${product.stock > 0 ? 'bg-black text-white' : 'bg-red-500 text-white'}`}>
                                        {product.stock > 0 ? `${product.stock} in stock` : 'Sold out'}
                                    </span>
                                </div>
                                <div className="absolute top-3 right-3">
                                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 text-gray-700">
                                        {product.category}
                                    </span>
                                </div>
                            </div>
                            
                            {/* Product Info */}
                            <div className="p-6 space-y-4">
                                <div>
                                    <p className="text-[11px] font-black text-blue-600 uppercase tracking-widest">{product.brand}</p>
                                    <h3 className="font-bold text-gray-900 text-lg leading-tight mt-1 group-hover:text-blue-600 transition-colors">{product.name}</h3>
                                    <p className="text-sm text-gray-400 mt-0.5">{product.gender} &middot; {product.category} Collection</p>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                                    <span className="text-sm font-semibold">{product.rating}</span>
                                    <span className="text-xs text-gray-400">({product.numReviews} reviews)</span>
                                </div>

                                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                    <p className="text-2xl font-black text-gray-900">${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => setEditingProduct(product)} 
                                            className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 text-gray-600 hover:bg-black hover:text-white transition-all"
                                            title="Edit"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                                        </button>
                                        <button 
                                            onClick={() => { if(window.confirm('Delete this listing?')) deleteMutation.mutate(product._id) }} 
                                            className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                                            title="Delete"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="col-span-full py-16 text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
                            </div>
                            <p className="text-gray-500 font-medium">No products listed yet</p>
                            <p className="text-gray-400 text-sm mt-1">Click "Add Listing" to start selling</p>
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
