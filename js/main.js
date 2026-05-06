new Vue({
    el: '#app',

    data: {
        products: [
            { 
                id: 1, 
                title: "Onion Classic", 
                short_text: "Свежий лук", 
                image: "images/cebyl2.jpg",
                link: "onion-classic.html"
            },
            { 
                id: 2, 
                title: "Onion Fresh", 
                short_text: "Сочный", 
                image: "images/cebyl3.jpg",
                link: "onion-fresh.html"
            },
            { 
                id: 3, 
                title: "Onion Premium", 
                short_text: "Премиум", 
                image: "images/cebyl4.jpg",
                link: "onion-prem.html"
            }
        ],

        cart: [],
        contactFields: {
            name: "",
            email: "",
            message: ""
        },

        orderDone: false
    },

    methods: {
        getCart() {
            let stored = JSON.parse(localStorage.getItem('cart')) || [];
        
            this.cart = stored.map(cartItem => {
                let product = this.products.find(p => p.id === cartItem.id);
        
                return {
                    ...product,
                    qty: cartItem.qty
                };
            });
        },
        increaseQty(item) {
            if (!item.qty) item.qty = 1;
            item.qty++;
        },
    
        decreaseQty(item) {
            if (!item.qty) item.qty = 1;
            if (item.qty > 1) item.qty--;
        },
    
        addToCart(item) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
            let found = cart.find(p => p.id === item.id);
    
            if (found) {
                found.qty += item.qty || 1;
            } else {
                cart.push({
                    id: item.id,
                    qty: item.qty || 1
                });
            }
    
            localStorage.setItem('cart', JSON.stringify(cart));
    
            alert("Добавлено!");
        }
    },
    watch: {
        cart: {
            handler(newCart) {
                let updated = newCart.map(item => ({
                    id: item.id,
                    qty: item.qty
                }));
    
                localStorage.setItem('cart', JSON.stringify(updated));
            },
            deep: true
        }
    },

    mounted() {
        this.getCart();
    }
});