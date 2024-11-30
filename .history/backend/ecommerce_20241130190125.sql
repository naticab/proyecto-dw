CREATE TABLE User (
    UserId INT AUTO_INCREMENT,
    UserFirstName VARCHAR(255),
    UserSecondtName VARCHAR(255),
    UserLastName VARCHAR(255),
    UserSecondLastName VARCHAR(255),
    UserPhoneNumber VARCHAR(255),
    UserEmail VARCHAR(255),
    UserNickname VARCHAR(255),
    UserProfilePicture VARCHAR(255),
    PRIMARY KEY (UserId),
);

CREATE TABLE Category (
    CategoryId INT AUTO_INCREMENT,
    CategoryName VARCHAR(255),
    CategoryDescription VARCHAR(255),
    CategoryImage VARCHAR(255),
    CategoryProductCount INT,
    PRIMARY KEY (CategoryId),
);

CREATE TABLE Product (
    ProductId INT AUTO_INCREMENT,
    CategoryId INT,
    ProductName VARCHAR(255),
    ProductCurrency VARCHAR(255),
    ProductPrice DECIMAL(20.0),
    ProductDescription VARCHAR(255),
    ProductImage VARCHAR(255),
    ProductSoldCount INT,
    ProductQuantity INT,
    PRIMARY KEY (ProductId),
    CONSTRAINT FK_CategoryId FOREIGN KEY (CategoryId) REFERENCES Category(Category)
);

CREATE TABLE ShoppingCart (
    ShoppingCartId INT AUTO_INCREMENT,
    ProductId INT,
    UserId INT,
    ShoppingCartSubtotalPrice DECIMAL(20.0),
    ShoppingCartTotalPrice DECIMAL(20.0),
    PRIMARY KEY (ShoppingCartId),
    CONSTRAINT FK_ProductId FOREIGN KEY (ProductId) REFERENCES Product(Product),
    CONSTRAINT FK_UserId FOREIGN KEY (UserId) REFERENCES User(User)
);

CREATE TABLE Checkout (
    CheckoutId INT AUTO_INCREMENT,
    ShoppingCartId INT,
    UserId INT,
    CheckoutShippingMethod VARCHAR(255),
    CheckoutUserAddress VARCHAR(255),
    CheckoutPaymentMethod VARCHAR(255),
    CheckoutSubtotalPrice DECIMAL(20.0),
    CheckoutDiscount DECIMAL(20.0),
    CheckoutTotalPrice DECIMAL(20.0),
    PRIMARY KEY (ShoppingCartId),
    CONSTRAINT FK_ProductId FOREIGN KEY (ProductId) REFERENCES Product(Product),
    CONSTRAINT FK_UserId FOREIGN KEY (UserId) REFERENCES User(User)
);