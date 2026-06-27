-- ============================================================
--  SOLE Shoe Store — MySQL Database Schema
--  Run this file first, then seed.sql
-- ============================================================

CREATE DATABASE IF NOT EXISTS sole_store
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE sole_store;

-- ── Categories ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS categories (
  id         VARCHAR(50)  PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  emoji      VARCHAR(10),
  sort_order INT          DEFAULT 0
);

-- ── Products ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id             INT           PRIMARY KEY AUTO_INCREMENT,
  name           VARCHAR(255)  NOT NULL,
  category       VARCHAR(100)  NOT NULL,
  price          DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2) NOT NULL,
  rating         DECIMAL(3,1)  NOT NULL DEFAULT 4.0,
  reviews        INT           NOT NULL DEFAULT 0,
  badge          VARCHAR(50)   DEFAULT NULL,
  bg             VARCHAR(255)  DEFAULT NULL,
  image          VARCHAR(500)  DEFAULT NULL,
  shoe_type      VARCHAR(50)   NOT NULL DEFAULT 'sneaker',
  shoe_colors    JSON          DEFAULT NULL,
  description    TEXT          DEFAULT NULL,
  features       JSON          DEFAULT NULL,
  sizes          JSON          DEFAULT NULL,
  colors         JSON          DEFAULT NULL,
  created_at     TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_category FOREIGN KEY (category)
    REFERENCES categories(id)
    ON UPDATE CASCADE
);

-- ── Contact Messages ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_messages (
  id         INT          PRIMARY KEY AUTO_INCREMENT,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(255) NOT NULL,
  subject    VARCHAR(100) DEFAULT 'General Inquiry',
  message    TEXT         NOT NULL,
  created_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

-- ── Newsletter Subscribers ───────────────────────────────────
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id         INT          PRIMARY KEY AUTO_INCREMENT,
  email      VARCHAR(255) NOT NULL UNIQUE,
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ── Orders ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id           INT           PRIMARY KEY AUTO_INCREMENT,
  customer_name  VARCHAR(100) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  total        DECIMAL(10,2) NOT NULL,
  shipping     DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  status       ENUM('pending','processing','shipped','delivered','cancelled')
               DEFAULT 'pending',
  created_at   TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_items (
  id         INT           PRIMARY KEY AUTO_INCREMENT,
  order_id   INT           NOT NULL,
  product_id INT           NOT NULL,
  size       VARCHAR(10)   DEFAULT NULL,
  color      VARCHAR(20)   DEFAULT NULL,
  qty        INT           NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  CONSTRAINT fk_order   FOREIGN KEY (order_id)   REFERENCES orders(id)  ON DELETE CASCADE,
  CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES products(id)
);
