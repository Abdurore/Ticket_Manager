<?php
require_once 'vendor/autoload.php';

$loader = new \Twig\Loader\FilesystemLoader('templates');
$twig = new \Twig\Environment($loader);

$page = $_GET['page'] ?? 'landing';

switch ($page) {
  case 'landing':
    echo $twig->render('landing.twig');
    break;
  case 'login':
    echo $twig->render('login.twig');
    break;
  case 'signup':
    echo $twig->render('signup.twig');
    break;
  case 'dashboard':
    echo $twig->render('dashboard.twig');
    break;
  case 'tickets':
    echo $twig->render('tickets.twig');
    break;
  default:
    header('Location: ?page=landing');
    exit;
}