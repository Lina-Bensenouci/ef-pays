<?php
/**
 * Package ef-pays
 * Version 1.0.0
 */
/*
Plugin name: ef-pays
Plugin uri: https://github.com/eddytuto
Version: 1.0.0
Description: Permet d'afficher les villes par pays.
*/
header("Access-Control-Allow-Origin: http://localhost");

function efp_enqueue() {
    $version_css = filemtime(plugin_dir_path(__FILE__) . "style.css");
    $version_js = filemtime(plugin_dir_path(__FILE__) . "js/ef-pays.js");
    wp_enqueue_style('em_plugin_efp_css',
        plugin_dir_url(__FILE__) . "style.css",
        array(),
        $version_css);

    wp_enqueue_script('em_plugin_efp_js',
        plugin_dir_url(__FILE__) . "js/ef-pays.js",
        array(),
        $version_js,
        true);

    // Localize script with country data
    wp_localize_script('em_plugin_efp_js', 'countryData', array(
        'France' => 'france',
        'États-Unis' => 'etats-unis',
        'Canada' => 'canada',
        'Argentine' => 'argentine',
        'Chili' => 'chili',
        'Belgique' => 'belgique',
        'Maroc' => 'maroc',
        'Mexique' => 'mexique',
        'Japon' => 'japon',
        'Italie' => 'italie',
        'Islande' => 'islande',
        'Chine' => 'chine',
        'Grèce' => 'grece',
        'Suisse' => 'suisse',
        // Add more countries if needed
    ));
}
add_action('wp_enqueue_scripts', 'efp_enqueue');

/* Create the list of cities in HTML */
function creation_pays() {
    $contenu = '<div class="country-menu">
                    <button class="country-button" data-country="france">France</button>
                    <button class="country-button" data-country="etats-unis">États-Unis</button>
                    <button class="country-button" data-country="canada">Canada</button>
                    <button class="country-button" data-country="argentine">Argentine</button>
                    <button class="country-button" data-country="chili">Chili</button>
                    <button class="country-button" data-country="belgique">Belgique</button>
                    <button class="country-button" data-country="maroc">Maroc</button>
                    <button class="country-button" data-country="mexique">Mexique</button>
                    <button class="country-button" data-country="japon">Japon</button>
                    <button class="country-button" data-country="italie">Italie</button>
                    <button class="country-button" data-country="islande">Islande</button>
                    <button class="country-button" data-country="chine">Chine</button>
                    <button class="country-button" data-country="grece">Grèce</button>
                    <button class="country-button" data-country="suisse">Suisse</button>
                    <!-- Add more buttons for additional countries as needed -->
                </div>
                <div class="contenu__restapi">
                </div>';
    return $contenu;
}

add_shortcode('em_pays', 'creation_pays');
?>