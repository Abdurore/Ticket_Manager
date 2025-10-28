# Use official PHP + Apache image
FROM php:8.2-apache

# Enable mod_rewrite (needed for routing)
RUN a2enmod rewrite

# Set working directory inside the container
WORKDIR /var/www/html

# Copy project files
COPY . .

# Install dependencies and Composer
RUN composer install --no-interaction --no-progress --optimize-autoloader --no-scripts

# Expose port 80 for Render
EXPOSE 80

# Start Apache when the container runs
CMD ["apache2-foreground"]
