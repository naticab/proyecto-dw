CREATE DATABASE EmercadoDB;
USE EmercadoDB;

CREATE TABLE User (
    UserId INT AUTO_INCREMENT NOT NULL,
    UserFirstName VARCHAR(255) NOT NULL,
    UserSecondName VARCHAR(255),
    UserLastName VARCHAR(255) NOT NULL,
    UserSecondLastName VARCHAR(255),
    UserPhoneNumber VARCHAR(255) NOT NULL,
    UserEmail VARCHAR(255) NOT NULL,
    UserNickname VARCHAR(255) NOT NULL,
    UserProfilePicture VARCHAR(255),
    PRIMARY KEY (UserId)
);

CREATE TABLE Category (
    CategoryId INT NOT NULL,
    CategoryName VARCHAR(255) NOT NULL,
    CategoryDescription VARCHAR(255) NOT NULL,
    CategoryImage VARCHAR(255) NOT NULL,
    CategoryProductCount INT NOT NULL,
    PRIMARY KEY (CategoryId)
);

CREATE TABLE Product (
    ProductId INT NOT NULL,
    CategoryId INT NOT NULL,
    ProductName VARCHAR(255) NOT NULL,
    ProductCurrency VARCHAR(10) NOT NULL,
    ProductPrice DECIMAL(20,2) NOT NULL,
    ProductDescription VARCHAR(255),
    ProductImage VARCHAR(255) NOT NULL,
    ProductSoldCount INT NOT NULL,
    ProductQuantity INT NOT NULL,
    PRIMARY KEY (ProductId),
    CONSTRAINT FK_Product_CategoryId FOREIGN KEY (CategoryId) REFERENCES Category(CategoryId)
);

CREATE TABLE ShoppingCart (
    ShoppingCartId INT AUTO_INCREMENT NOT NULL,
    ProductId INT NOT NULL,
    UserId INT NOT NULL,
    ShoppingCartSubtotalPrice DECIMAL(20,2) NOT NULL,
    ShoppingCartTotalPrice DECIMAL(20,2) NOT NULL,
    PRIMARY KEY (ShoppingCartId),
    CONSTRAINT FK_ShoppingCart_ProductId FOREIGN KEY (ProductId) REFERENCES Product(ProductId),
    CONSTRAINT FK_ShoppingCart_UserId FOREIGN KEY (UserId) REFERENCES User(UserId)
);

CREATE TABLE Checkout (
    CheckoutId INT AUTO_INCREMENT NOT NULL,
    ShoppingCartId INT NOT NULL,
    UserId INT NOT NULL,
    CheckoutShippingMethod VARCHAR(255) NOT NULL,
    CheckoutUserAddress VARCHAR(255) NOT NULL,
    CheckoutPaymentMethod VARCHAR(255) NOT NULL,
    CheckoutSubtotalPrice DECIMAL(20,2) NOT NULL,
    CheckoutDiscount DECIMAL(20,2) NOT NULL,
    CheckoutTotalPrice DECIMAL(20,2) NOT NULL,
    PRIMARY KEY (CheckoutId),
    CONSTRAINT FK_Checkout_ShoppingCartId FOREIGN KEY (ShoppingCartId) REFERENCES ShoppingCart(ShoppingCartId),
    CONSTRAINT FK_Checkout_UserId FOREIGN KEY (UserId) REFERENCES User(UserId)
);
