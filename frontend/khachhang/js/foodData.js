const foodData = {
    cupcake: [
        { id: 1, name: "Cupcake 1", price: "30.000", image: "https://picsum.photos/200/150?random=1" },
        { id: 2, name: "Cupcake 2", price: "30.000", image: "https://picsum.photos/200/150?random=2" },
    ],
    seafood: [
        { id: 1, name: "Hamburger", price: "30.000", image: "https://picsum.photos/200/150?random=3" },
        { id: 2, name: "Grilled Squid Satay", price: "30.000", image: "https://picsum.photos/200/150?random=4" },
        { id: 3, name: "Pasta", price: "30.000", image: "https://picsum.photos/200/150?random=5" },
        { id: 4, name: "Water", price: "30.000", image: "https://picsum.photos/200/150?random=6" },
        { id: 5, name: "Orange Juice", price: "30.000", image: "https://picsum.photos/200/150?random=7" },
    ],
    juice: [
        { id: 1, name: "Juice 1", price: "30.000", image: "https://picsum.photos/200/150?random=8" },
        { id: 2, name: "Juice 2", price: "30.000", image: "https://picsum.photos/200/150?random=9" },
    ],
    coca: [
        { id: 1, name: "Coca 1", price: "30.000", image: "https://picsum.photos/200/150?random=10" },
        { id: 2, name: "Coca 2", price: "30.000", image: "https://picsum.photos/200/150?random=11" },
    ],
    orangejuice: [
        { id: 1, name: "Orange Juice 1", price: "30.000", image: "https://picsum.photos/200/150?random=12" },
        { id: 2, name: "Orange Juice 2", price: "30.000", image: "https://picsum.photos/200/150?random=13" },
    ],
};

// Hàm hiển thị dữ liệu
function displayFoodItems(items) {
    const foodItemsContainer = document.querySelector("#food-items");
    foodItemsContainer.innerHTML = ''; // Xóa nội dung cũ

    items.forEach(item => {
        const card = `
        <div class="col-4 fw-bold">
            <div class="food-card shadow border border-1">
                <img src="${item.image}">

                <div class="card-body p-3">
                    <h5 class="card-title"><span class="text-danger">${item.id}. </span>${item.name}</h5>

                    <div class="d-flex justify-content-between align-items-center">
                        <p class="card-text text-danger m-0">${item.price}đ</p>
                        <button class="add-to-cart">
                            <i class="bi bi-cart"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
      `;

        foodItemsContainer.innerHTML += card;
    });
}

displayFoodItems(foodData.seafood);