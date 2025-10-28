# Use official PHP + Apache image
FROM php:8.2-apache

# Enable mod_rewrite for pretty URLs
RUN a2enmod rewrite

# Set working directory
WORKDIR /var/www/html

# Copy all project files
COPY . .

# Install dependencies and Composer safely
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    libicu-dev \
    libxml2-dev \
    curl && \
    docker-php-ext-install intl zip && \
    curl -sS https://getcomposer.org/installer -o composer-setup.php && \
    php composer-setup.php --install-dir=/usr/local/bin --filename=composer && \
    rm composer-setup.php && \
    composer install --no-interaction --no-progress --optimize-autoloader --no-scripts

# ✅ Copy your API files into Apache's web root
RUN cp -r api/* /var/www/html/

# Expose port 80
EXPOSE 80

# Start Apache
CMD ["apache2ctl", "-D", "FOREGROUND", "-f", "/etc/apache2/apache2.conf", "-c", "DocumentRoot /var/www/html/api"]
