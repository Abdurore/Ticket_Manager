# Use official PHP + Apache image
FROM php:8.2-apache

# Enable mod_rewrite (needed for routing)
RUN a2enmod rewrite

# Set working directory inside the container
WORKDIR /var/www/html

# Copy project files
COPY . .

# Install dependencies and Composer
RUN apt-get update && \
    apt-get install -y unzip git && \
    curl -sS https://getcomposer.org/installer | php && \
    mv composer.phar /usr/local/bin/composer && \
    composer install --no-interaction --no-progress --optimize-autoloader

# Expose port 80 for Render
EXPOSE 80

# Start Apache when the container runs
CMD ["apache2-foreground"]
