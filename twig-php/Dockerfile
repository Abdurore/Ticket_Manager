FROM php:8.2-apache

# Enable rewrite module for Apache
RUN a2enmod rewrite

# Set working directory
WORKDIR /var/www/html

# Copy all project files
COPY . .

# Install system dependencies & PHP extensions needed by Twig/Composer
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    libicu-dev \
    libxml2-dev \
    && docker-php-ext-install intl zip \
    && curl -sS https://getcomposer.org/installer | php \
    && mv composer.phar /usr/local/bin/composer \
    && composer install --no-interaction --no-progress --optimize-autoloader --no-scripts

# Expose port 80 for Render
EXPOSE 80

# Start Apache
CMD ["apache2ctl", "-D", "FOREGROUND", "-f", "/etc/apache2/apache2.conf", "-c", "DocumentRoot /var/www/html/api"]"]
