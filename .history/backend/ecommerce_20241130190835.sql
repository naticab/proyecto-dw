CREATE TABLE User (
    UserId INT AUTO_INCREMENT,
    UserFirstName VARCHAR(255),
    UserSecondName VARCHAR(255),
    UserLastName VARCHAR(255),
    UserSecondLastName VARCHAR(255),
    UserPhoneNumber VARCHAR(255),
    UserEmail VARCHAR(255),
    UserNickname VARCHAR(255),
    UserProfilePicture VARCHAR(255),
    PRIMARY KEY (UserId)
);

CREATE TABLE Category (
    CategoryId INT AUTO_INCREMENT,
    CategoryName VARCHAR(255),
    CategoryDescription VARCHAR(255),
    CategoryImage VARCHAR(255),
    CategoryProductCount INT,
    PRIMARY KEY (CategoryId)
);

CREATE TABLE Product (
    ProductId INT AUTO_INCREMENT,
    CategoryId INT,
    ProductName VARCHAR(255),
    ProductCurrency VARCHAR(10),
    ProductPrice DECIMAL(20,2), -- Precio con dos decimales
    ProductDescription VARCHAR(255),
    ProductImage VARCHAR(255),
    ProductSoldCount INT,
    ProductQuantity INT,
    PRIMARY KEY (ProductId),
    CONSTRAINT FK_Product_CategoryId FOREIGN KEY (CategoryId) REFERENCES Category(CategoryId)
);

CREATE TABLE ShoppingCart (
    ShoppingCartId INT AUTO_INCREMENT,
    ProductId INT,
    UserId INT,
    ShoppingCartSubtotalPrice DECIMAL(20,2),
    ShoppingCartTotalPrice DECIMAL(20,2),
    PRIMARY KEY (ShoppingCartId),
    CONSTRAINT FK_ShoppingCart_ProductId FOREIGN KEY (ProductId) REFERENCES Product(ProductId),
    CONSTRAINT FK_ShoppingCart_UserId FOREIGN KEY (UserId) REFERENCES User(UserId)
);

CREATE TABLE Checkout (
    CheckoutId INT AUTO_INCREMENT,
    ShoppingCartId INT,
    UserId INT,
    CheckoutShippingMethod VARCHAR(255),
    CheckoutUserAddress VARCHAR(255),
    CheckoutPaymentMethod VARCHAR(255),
    CheckoutSubtotalPrice DECIMAL(20,2),
    CheckoutDiscount DECIMAL(20,2),
    CheckoutTotalPrice DECIMAL(20,2),
    PRIMARY KEY (CheckoutId),
    CONSTRAINT FK_Checkout_ShoppingCartId FOREIGN KEY (ShoppingCartId) REFERENCES ShoppingCart(ShoppingCartId),
    CONSTRAINT FK_Checkout_UserId FOREIGN KEY (UserId) REFERENCES User(UserId)
);
