<?php
get_header();
?>
            <div id="app">
<?php
                if (have_posts()): while ( have_posts()): the_post(); ?>
                <article class="mainnews">
                    <?php
                    get_template_part('spa/src/pages/NewsPost'); ?>
                </article>
                <?php endwhile;
                endif;
                ?>
            </div>

