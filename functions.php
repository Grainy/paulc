<?php

/**
 * Enqueue scripts and styles.
 */
// Load the theme stylesheets
function _scripts() {
	wp_register_script(
		'jquery',
		get_stylesheet_directory_uri() . '/bower_components/jquery/dist/jquery.min.js'
	);
	wp_enqueue_script(
		'my-scripts',
		get_stylesheet_directory_uri() . '/build/js/scripts.min.js',
		array( 'angularjs', 'angularjs-route', 'angularjs-sanitize' )
	);

	wp_enqueue_script( 
		'scripts', 
		get_template_directory_uri() . '/build/js/scripts.min.js', 
		array('jquery'), '20120206', true );

	// Load all of the styles that need to appear on all pages
	wp_enqueue_style( 'custom', get_template_directory_uri() . '/app/css/style.css' );
}

add_action( 'wp_enqueue_scripts', '_scripts' );

if ( ! class_exists( 'Timber' ) ) {
	add_action( 'admin_notices', function() {
			echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php' ) ) . '</a></p></div>';
		} );
	return;
}

Timber::$dirname = array('templates', 'views');

class StarterSite extends TimberSite {

	function __construct() {
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'menus' );
		add_filter( 'timber_context', array( $this, 'add_to_context' ) );
		add_filter( 'get_twig', array( $this, 'add_to_twig' ) );
		add_action( 'init', array( $this, 'register_post_types' ) );
		add_action( 'init', array( $this, 'register_taxonomies' ) );
		parent::__construct();
	}

	function register_post_types() {
		//this is where you can register custom post types
	}

	function register_taxonomies() {
		//this is where you can register custom taxonomies
	}

	function add_to_context( $context ) {
		$context['foo'] = 'bar';
		$context['stuff'] = 'I am a value set in your functions.php file';
		$context['notes'] = 'These values are available everytime you call Timber::get_context();';
		$context['menu'] = new TimberMenu();
		$context['primaryNav'] = new TimberMenu('primary');
		$context['site'] = $this;
		$context['options'] = get_fields('options');
		return $context;
	}

	function myfoo( $text ) {
		$text .= ' bar!';
		return $text;
	}

	function add_to_twig( $twig ) {
		/* this is where you can add your own fuctions to twig */
		$twig->addExtension( new Twig_Extension_StringLoader() );
		$twig->addFilter('myfoo', new Twig_SimpleFilter('myfoo', array($this, 'myfoo')));
		return $twig;
	}

}

new StarterSite();

if ( ! function_exists( '_setup' ) ) :

function _setup() {
	register_nav_menus( array(
		'primary' => __( 'Primary Menu', 'Masthead Navigation' )
	) );
}

endif; // _setup
add_action( 'after_setup_theme', '_setup' );

if( function_exists('acf_add_options_page') ) {
    acf_add_options_page( 'Footer' );
}
