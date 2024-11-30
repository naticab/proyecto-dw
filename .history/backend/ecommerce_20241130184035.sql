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