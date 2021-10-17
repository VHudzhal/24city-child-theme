<?php
/**
 * Vue Twenty Seventeen Child Theme Functions and Definitions.
 * Requires Twenty Seventeen and only works in WordPress 4.7 or later.
 *
 * @package WordPress
 */

 // includes for the callbacks.
include_once( get_stylesheet_directory() . '/includes/enqueue-scripts.php' );
include_once( get_stylesheet_directory() . '/includes/extend-api.php' );

/* hooks and filters */

// enqueue-scripts.php.
add_action( 'wp_enqueue_scripts', 'vuetwentyseventeen_enqueue_styles' );
add_action( 'wp_enqueue_scripts', 'vuetwentyseventeen_enqueue_spa_scripts' );
/* Add post image support */
add_theme_support( 'post-thumbnails' );


/* Add custom thumbnail sizes */
if ( function_exists( 'add_image_size' ) ) {
    add_image_size( '300x180', 300, 180, true );
}
add_action('init', function () {
    global $wp_post_types;
    foreach (get_post_types() as $post_type) {
        if ($wp_post_types[$post_type]->public && !$wp_post_types[$post_type]->show_in_rest) {
            $wp_post_types[$post_type]->show_in_rest = true;
            if (empty($wp_post_types[$post_type]->rest_base)) {
                $wp_post_types[$post_type]->rest_base = $wp_post_types[$post_type]->name;
            }
        }
    }
}, 40000);
// extend-api.php.
add_action( 'rest_api_init', 'vuetwentyseventeen_extend_api_response' );
add_action('wp_ajax_my_action', 'my_action');
add_action('wp_ajax_nopriv_my_action', 'my_action');
//add_action('rest_api_init', function() {
//    register_rest_route( 'wp/v2', '/mainnews/', array(
//        'methods' => 'GET',
//        'callback' => 'markers_endpoint'
//    ));
//});
function prepare_rest($data, $post, $request){
    $_data = $data->data;

    // Thumbnails
    $thumbnail_id = get_post_thumbnail_id( $post->ID );
    $thumbnail300x180 = wp_get_attachment_image_src( $thumbnail_id, '300x180' );
    $thumbnailMedium = wp_get_attachment_image_src( $thumbnail_id, 'medium' );
    $full = wp_get_attachment_image_src( $thumbnail_id, 'full' );

    //Categories
    $cats = get_the_category($post->ID);

    //next/prev

    $nextPost = get_adjacent_post(false, '', true );
    $nextPost = $nextPost->ID;

    $prevPost = get_adjacent_post(false, '', false );
    $prevPost = $prevPost->ID;

    $_data['fi_300x180'] = $thumbnail300x180[0];
    $_data['fi_medium'] = $thumbnailMedium[0];
    $_data['full'] = $full[0];
    $_data['cats'] = $cats;
    $_data['next_post'] = $nextPost;
    $_data['previous_post'] = $prevPost;
    $data->data = $_data;

    return $data;
}
add_filter('rest_prepare_post', 'prepare_rest', 10, 3);
function show_image($object, $field_name, $request){
    $thumbID = get_post_thumbnail_id($object['id']);
    $image = wp_get_attachment_image_src( $thumbID, '300x180');
    return $image[0];
}
function post_featured_image_json( $data, $post, $context ) {
    $featured_image_id = $data->data['featured_media']; // get featured image id
    $featured_image_url = wp_get_attachment_image_src( $featured_image_id, 'original' ); // get url of the original size

    if( $featured_image_url ) {
        $data->data['featured_image_url'] = $featured_image_url[0];
    }

    return $data;
}
add_filter( 'rest_prepare_post', 'post_featured_image_json', 10, 3 );
/* Add featured image to REST API */

add_action('rest_api_init', 'register_rest_images' );
function register_rest_images(){
    register_rest_field( array('post'),
        'fimg_url',
        array(
            'get_callback'    => 'get_rest_featured_image',
            'update_callback' => null,
            'schema'          => null,
        )
    );
}
function get_rest_featured_image( $object, $field_name, $request ) {
    if( $object['featured_media'] ){
        $img = wp_get_attachment_image_src( $object['featured_media'], 'app-thumb' );
        return $img[0];
    }
    return false;
}