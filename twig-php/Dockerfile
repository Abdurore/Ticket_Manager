# Use an official PHP image
FROM php:8.2-apache

# Enable Apache rewrite module (if you use routing)
RUN a2enmod rewrite

# Set working directory
WORKDIR /var/www/html

# Copy all project files
COPY . .

# Install dependencies (Twig, etc.)
RUN apt-get update && apt-get install -y unzip \
    && php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
    && php composer-setup.php --install-dir=/usr/local/bin --filename=composer \
    && composer install

# Expose port 80
EXPOSE 80

# Start Apache
CMD ["apache2-foreground"]
