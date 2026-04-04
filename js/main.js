new Vue({
    el: '#app',

    data: {
        products: [
            { id: 1, title: "Onion Classic", short_text: "Свежий лук", image: "images/cebyl2.jpg" },
            { id: 2, title: "Onion Fresh", short_text: "Сочный", image: "images/cebyl3.jpg" },
            { id: 3, title: "Onion Premium", short_text: "Премиум", image: "images/cebyl4.jpg" }
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
        addToCart(id) {
            let ids = JSON.parse(localStorage.getItem('cart')) || [];
        
            if (!ids.includes(id)) {
                ids.push(id);
            }
        
            localStorage.setItem('cart', JSON.stringify(ids));
        },
        // 🔥 получить корзину из localStorage
        getCart() {
            let ids = JSON.parse(localStorage.getItem('cart')) || [];

            this.cart = this.products.filter(product =>
                ids.includes(product.id)
            );
        },

        // ❌ удалить товар
        removeFromCart(id) {
            let ids = JSON.parse(localStorage.getItem('cart')) || [];

            ids = ids.filter(itemId => itemId !== id);

            localStorage.setItem('cart', JSON.stringify(ids));

            this.getCart(); // обновить
        },

        // 🛒 оформить заказ
        makeOrder() {
            console.log("Данные формы:", this.contactFields);

            this.orderDone = true;

            // очистка корзины
            this.cart = [];
            localStorage.removeItem('cart');
        }
    },

    mounted() {
        this.getCart();
    }
});