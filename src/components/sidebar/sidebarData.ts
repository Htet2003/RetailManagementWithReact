import { ShoppingCart, Layers3, LayoutDashboard } from "lucide-react"

export const sidebarData = [
    {
        routeName: '/',
        name: 'Stock',
        icon: Layers3
    },
    {
        routeName: '/cart',
        name: 'Cart',
        icon: ShoppingCart
    },
    {
        routeName: '/dashboard',
        name: 'Dashboard',
        icon: LayoutDashboard
    },
]