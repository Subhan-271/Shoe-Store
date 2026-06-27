-- ============================================================
--  SOLE Shoe Store — Seed Data
--  Run after schema.sql
-- ============================================================

USE sole_store;

-- ── Categories ──────────────────────────────────────────────
INSERT INTO categories (id, name, emoji, sort_order) VALUES
  ('running',    'Running',         '🏃', 1),
  ('casual',     'Casual',          '😎', 2),
  ('hiking',     'Hiking',          '🏔️', 3),
  ('basketball', 'Basketball',      '🏀', 4),
  ('formal',     'Formal',          '👔', 5),
  ('limited',    'Limited Edition', '⚡', 6)
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- ── Products ────────────────────────────────────────────────
INSERT INTO products
  (name, category, price, original_price, rating, reviews, badge, bg, image,
   shoe_type, shoe_colors, description, features, sizes, colors)
VALUES

-- 1. CloudRunner X Pro
('CloudRunner X Pro', 'running', 41999, 53999, 4.8, 234,
 'New Arrival',
 'linear-gradient(135deg, #e63946 0%, #9b1c2a 100%)',
 '/images/shoes/cloudrunner-x-pro.jpg',
 'sneaker',
 '["#e63946","#9b1c2a","#ff8a92"]',
 'Experience unmatched comfort with the CloudRunner X Pro. Engineered for serious runners, featuring advanced cushioning technology and breathable mesh upper for those long training sessions.',
 '["Advanced CloudFoam cushioning","Breathable mesh upper","Lightweight 220g design","Non-slip carbon outsole"]',
 '[7,7.5,8,8.5,9,9.5,10,10.5,11,12]',
 '["#e63946","#1a1a1a","#f8f9fa"]'),

-- 2. Urban Glide Classic
('Urban Glide Classic', 'casual', 24999, 24999, 4.5, 187,
 NULL,
 'linear-gradient(135deg, #2563eb 0%, #1e3a8a 100%)',
 '/images/shoes/daniel-storek-JM-qKEd1GMI-unsplash.jpg',
 'sneaker',
 '["#2563eb","#1e3a8a","#93c5fd"]',
 'The perfect everyday casual shoe. Urban Glide Classic combines street style with all-day comfort for the modern trendsetter who refuses to compromise on looks or feel.',
 '["Premium leather upper","Memory foam insole","Flexible rubber sole","Classic low-profile silhouette"]',
 '[6,7,8,9,10,11,12]',
 '["#2563eb","#d4a017","#e8e8e8"]'),

-- 3. TrailBlaze Summit
('TrailBlaze Summit', 'hiking', 49999, 63999, 4.7, 156,
 'Sale',
 'linear-gradient(135deg, #059669 0%, #064e3b 100%)',
 '/images/shoes/raul-de-los-santos-6tpdFZtbj0E-unsplash.jpg',
 'boot',
 '["#059669","#064e3b","#6ee7b7"]',
 'Conquer any terrain with the TrailBlaze Summit. Built for outdoor enthusiasts who demand reliability and performance in the most challenging off-road conditions.',
 '["Waterproof membrane","Vibram outsole","Ankle support system","Quick-dry lining"]',
 '[7,8,9,10,11,12,13]',
 '["#059669","#92400e","#1f2937"]'),

-- 4. Court King Elite
('Court King Elite', 'basketball', 44999, 55999, 4.6, 203,
 'Best Seller',
 'linear-gradient(135deg, #1a1a1a 0%, #3d3d3d 100%)',
 '/images/shoes/ox-street-BWPqHZBhMVA-unsplash.jpg',
 'sneaker',
 '["#1a1a1a","#3d3d3d","#e63946"]',
 'Dominate the court with Court King Elite. Designed for explosive performance with superior ankle support and responsive cushioning that keeps you at your peak all game long.',
 '["High-top ankle support","Responsive Zoom cushioning","Multi-directional grip outsole","Reinforced toe cap"]',
 '[8,9,10,11,12,13]',
 '["#1a1a1a","#e63946","#f59e0b"]'),

-- 5. Speed Demon Ultra
('Speed Demon Ultra', 'running', 61999, 77999, 4.9, 312,
 'Top Pick',
 'linear-gradient(135deg, #7c3aed 0%, #3b0764 100%)',
 '/images/shoes/archer-allstars-D_0iYotrcUk-unsplash.jpg',
 'sneaker',
 '["#7c3aed","#3b0764","#c4b5fd"]',
 'Break your personal records with Speed Demon Ultra. Featuring our most advanced carbon fiber plate technology for maximum energy return with every stride.',
 '["Carbon fiber plate","Ultra-lightweight 180g","Pebax energy-return foam","Aerodynamic upper"]',
 '[7,7.5,8,8.5,9,9.5,10,11]',
 '["#7c3aed","#ec4899","#000000"]'),

-- 6. Street Wave
('Street Wave', 'casual', 19999, 27999, 4.2, 98,
 'Sale',
 'linear-gradient(135deg, #d97706 0%, #78350f 100%)',
 '/images/shoes/maria-fernanda-pissioli-i8OruGmFXtw-unsplash.jpg',
 'sneaker',
 '["#d97706","#78350f","#fcd34d"]',
 'Where comfort meets street style. Street Wave offers a relaxed fit with a retro-inspired silhouette perfect for everyday adventures around the city.',
 '["Canvas upper","Cushioned OrthoLite insole","Vulcanized sole","Versatile colorways"]',
 '[6,7,8,9,10,11]',
 '["#d97706","#1a1a1a","#6b7280"]'),

-- 7. Summit X3 Boot
('Summit X3 Boot', 'hiking', 55999, 55999, 4.8, 89,
 'New Arrival',
 'linear-gradient(135deg, #92400e 0%, #451a03 100%)',
 NULL,
 'boot',
 '["#92400e","#451a03","#d4a017"]',
 'The Summit X3 Boot is built for the most demanding trails. Every component is designed to handle extreme weather while keeping your feet warm and comfortable.',
 '["Gore-Tex waterproofing","Steel shank support","Crampon compatible sole","200g Thinsulate insulation"]',
 '[7,8,9,10,11,12]',
 '["#92400e","#1a1a1a","#374151"]'),

-- 8. NightGlow Limited
('NightGlow Limited', 'limited', 83999, 97999, 5.0, 28,
 'Limited',
 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #7c3aed 100%)',
 '/images/shoes/irene-kredenets-dwKiHoqqxk8-unsplash.jpg',
 'sneaker',
 '["#1e3a5f","#0f172a","#7c3aed"]',
 'Our most exclusive release. NightGlow Limited features 3M reflective materials woven throughout the upper that come alive in low light. Only 500 pairs worldwide.',
 '["3M Scotchlite reflective upper","Premium suede accents","Glow-in-the-dark outsole","Certificate of authenticity"]',
 '[7,8,9,10,11]',
 '["#0f172a","#7c3aed"]'),

-- 9. Velocity Runner
('Velocity Runner', 'running', 27999, 36999, 4.3, 167,
 'Sale',
 'linear-gradient(135deg, #db2777 0%, #701a75 100%)',
 '/images/shoes/mana-akbarzadegan-kLnlaZJ4SMA-unsplash.jpg',
 'sneaker',
 '["#db2777","#701a75","#f9a8d4"]',
 'Start your running journey with Velocity Runner. The perfect shoe for beginners and recreational runners seeking reliable performance and comfort at a great price.',
 '["EVA foam cushioning","Breathable knit upper","Durable rubber outsole","Padded tongue & collar"]',
 '[6,7,8,9,10,11]',
 '["#db2777","#7c3aed","#374151"]'),

-- 10. Drift Casual Plus
('Drift Casual Plus', 'casual', 22999, 22999, 4.1, 76,
 NULL,
 'linear-gradient(135deg, #4f46e5 0%, #1e1b4b 100%)',
 '/images/shoes/nadya-nada-YMU2RNYjL0M-unsplash.jpg',
 'sneaker',
 '["#4f46e5","#1e1b4b","#a5b4fc"]',
 'The Drift Casual Plus is your go-to shoe for laid-back days. Easy slip-on design with a supportive footbed means you can stay comfortable all day, effortlessly.',
 '["Slip-on design","Elastic goring side panels","Padded collar","Flexible cupsole"]',
 '[7,8,9,10,11,12]',
 '["#4f46e5","#0891b2","#6b7280"]'),

-- 11. Apex Oxford
('Apex Oxford', 'formal', 47999, 61999, 4.6, 54,
 'Sale',
 'linear-gradient(135deg, #292524 0%, #0c0a09 100%)',
 '/images/shoes/the-dk-photography-7Uwh8QXYdXQ-unsplash.jpg',
 'oxford',
 '["#292524","#0c0a09","#d4a017"]',
 'Elevate your formal wardrobe with Apex Oxford. Hand-crafted with genuine full-grain leather, perfect for business meetings and special occasions.',
 '["Full-grain leather upper","Leather lining","Leather-covered insole","Goodyear welt construction"]',
 '[7,8,9,10,11,12]',
 '["#292524","#7f1d1d","#d4a017"]'),

-- 12. Slam Dunk Pro
('Slam Dunk Pro', 'basketball', 38999, 47999, 4.4, 145,
 NULL,
 'linear-gradient(135deg, #0891b2 0%, #0c4a6e 100%)',
 '/images/shoes/peri-stojnic-r3rbIwZ9DJc-unsplash.jpg',
 'sneaker',
 '["#0891b2","#0c4a6e","#67e8f9"]',
 'Engineered for the player who wants it all. Slam Dunk Pro delivers exceptional grip, lateral support, and on-trend style on and off the court.',
 '["Breathable mesh collar","Foam ankle padding","Herringbone rubber outsole","Dual-density midsole"]',
 '[8,9,10,11,12,13,14]',
 '["#0891b2","#e63946","#000000"]');
