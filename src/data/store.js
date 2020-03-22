import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        drawer: false,
        apiUrl: "https://cors-anywhere.herokuapp.com/https://test-api.updivision.work/api",
        links: [{
                label: "Login",
                url: "/login"
            },
            {
                label: "Register",
                url: "/register"
            }
        ],
        userInfo: {
            isLoggedIn: false,
            isSignedUp: false,
            hasSearched: false,
            name: "",
            productTitleSearched: "",
            accessToken: ""
        },
        systemInfo: {
            openDetailModal: false,
            openLoginModal: false,
            openSignupModal: false,
            openCheckoutModal: false,
            product: []
        }
    },

    mutations: {
        logout: state => {
            state.userInfo.accessToken = "";
        },
        addToCart: (state, id) => {
            state.products.forEach(el => {
                if (id === el.id) {
                    el.isAddedToCart = true;
                }
            });
        },
        setAddedBtn: (state, data) => {
            state.products.forEach(el => {
                if (data.id === el.id) {
                    el.isAddedBtn = data.status;
                }
            });
        },
        removeFromCart: (state, id) => {
            state.products.forEach(el => {
                if (id === el.id) {
                    el.isAddedToCart = false;
                }
            });
        },
        removeProductsFromFavourite: state => {
            state.products.filter(el => {
                el.isFavourite = false;
            });
        },
        isUserLoggedIn: (state, isUserLoggedIn) => {
            state.userInfo.isLoggedIn = isUserLoggedIn;
        },
        isUserSignedUp: (state, isSignedUp) => {
            state.userInfo.isSignedUp = isSignedUp;
        },
        setHasUserSearched: (state, hasSearched) => {
            state.userInfo.hasSearched = hasSearched;
        },
        setUserName: (state, name) => {
            state.userInfo.name = name;
        },
        setAccessToken: (state, accessToken) => {
            state.userInfo.accessToken = accessToken;
            state.links = [{
                label: "Product List",
                url: "/productlist"
            }];
        },
        setProductTitleSearched: (state, titleSearched) => {
            state.userInfo.productTitleSearched = titleSearched;
        },
        showLoginModal: (state, show) => {
            state.systemInfo.openLoginModal = show;
        },
        showSignupModal: (state, show) => {
            state.systemInfo.openSignupModal = show;
        },
        showCheckoutModal: (state, show) => {
            state.systemInfo.openCheckoutModal = show;
        },
        showDetailModal: (state, data) => {
            state.systemInfo.openDetailModal = data.show;
            state.systemInfo.product = data.product;
        },
        addToFavourite: (state, id) => {
            state.products.forEach(el => {
                if (id === el.id) {
                    el.isFavourite = true;
                }
            });
        },
        removeFromFavourite: (state, id) => {
            state.products.forEach(el => {
                if (id === el.id) {
                    el.isFavourite = false;
                }
            });
        },
        quantity: (state, data) => {
            state.products.forEach(el => {
                if (data.id === el.id) {
                    el.quantity = data.quantity;
                }
            });
        },
        SET_USER(state, authUser) {
            state.authUser = authUser;
        }
    },

    getters: {
        productsAdded: state => {
            return state.products.filter(el => {
                return el.isAddedToCart;
            });
        },
        productsAddedToFavourite: state => {
            return state.products.filter(el => {
                return el.isFavourite;
            });
        },
        getProductById: state => id => {
            return state.products.find(product => product.id == id);
        },
        isUserLoggedIn: state => {
            return state.userInfo.isLoggedIn;
        },
        isUserSignedUp: state => {
            return state.userInfo.isSignedUp;
        },
        getUserName: state => {
            return state.userInfo.name;
        },
        getAccessToken: state => {
            return state.userInfo.accessToken;
        },
        getLinks: state => {
            return state.links;
        },
        isDetailModalOpen: state => {
            return state.systemInfo.openDetailModal;
        },
        selectedProduct: state => {
            return state.systemInfo.product;
        },
        isLoginModalOpen: state => {
            return state.systemInfo.openLoginModal;
        },
        isSignupModalOpen: state => {
            return state.systemInfo.openSignupModal;
        },
        isCheckoutModalOpen: state => {
            return state.systemInfo.openCheckoutModal;
        },
        quantity: state => {
            return state.products.quantity;
        }
    }
});