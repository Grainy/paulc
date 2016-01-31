<?php
/**
 * The template for displaying 404 pages (Not Found)
 *
 * Methods for TimberHelper can be found in the /functions sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

$context = Timber::get_context();

$paged = (get_query_var('paged')) ? get_query_var('paged') : 1;

$args = array(
	'post_type' => 'post',
	'posts_per_page' => 3,
	'paged' => $paged
);

$context['posts'] = Timber::get_posts($args);

Timber::render( '404.twig', $context );
