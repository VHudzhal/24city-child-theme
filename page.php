<?php
/*
 * The template for displaying all pages
 */
get_header();
?>

<section id="primary" class="bizov-container d-flex flex-column mx-auto row">
    <?php get_sidebar('head-left');?>
    <div class="content-area col-12 row">
        <?php    get_sidebar('left-main');?>
        <main id="main" class="site-main col-lg-9 col-md-9 col-sm-12 col-xs-12" role="main">
            <div class="header d-flex"><span id="head-title" class="d-flex"><?php the_title()?></span></div>
            <?php

            //		/* Start the Loop */
            //		while ( have_posts() ) :
            //			the_post();
            //the_content();
            ////			get_template_part( 'template-parts/content/content', 'page' );
            //		endwhile; // End of the loop.
            //?>
            <?php

            while (have_posts()) : the_post();
                the_content();
            endwhile; // End of the loop.
            ?>
            <div id="app"></div>
        </main><!-- #main -->
    </div>
</section><!-- #primary -->


<?php //get_sidebar();
get_footer(); ?>
