// $(document).ready(function() {
//
//   // ---- Elasticsearch ----
//
//   var elasticServer = 'http://'+elasticsearch_params.server_IP+':'+elasticsearch_params.server_Port+'/';
//   // +'demo_elasticsearch_backend_shopinvader_variant_en_us/_search';
//   var product_index = elasticsearch_params.products_index;
//   var category_index = elasticsearch_params.categories_index;
//
  //TODO look into msearch to search product and category
//
//   $( function() {
//
//     var availableTags = [
//       "ActionScript",
//       "AppleScript",
//       "Asp",
//       "BASIC",
//       "C",
//       "C++",
//       "Clojure",
//       "COBOL",
//       "ColdFusion",
//       "Erlang",
//       "Fortran",
//       "Groovy",
//       "Haskell",
//       "Java",
//       "JavaScript",
//       "Lisp",
//       "Perl",
//       "PHP",
//       "Python",
//       "Ruby",
//       "Scala",
//       "Scheme"
//     ];
//
//
//
//   // var hitsSource = autocomplete.sources.hits(category_index, { hitsPerPage: 5 });
//   $('#header-search-input').autocomplete(
//     {
//       debug: true,
//       dropdownMenuContainer: '#header-search-hit-dropdown',
//       templates: {
//         dropdownMenu: $('#header-search-hit-content').html()
//       },
//       cssClasses: {
//         "dropdownMenu": "dropdown-menu header-dropdown-menu container"
//       }
//     },
//     [
//       {
//         source: availableTags,
//         displayKey: 'name',
//         name: 'product',
//
//         cssClasses: {
//           suggestions:"",
//           suggestion: " product-search-list",
//         },
//         templates: {
//           header: function(query, result) {
//             return search_template_title($('#header-search-product-title'), result)
//             +"<div class='row row-same-height'>";
//           },
//           footer:  function(query, result) {
//             return "</div>"
//             + search_template_link($('#header-search-product-link'), query, result);
//           },
//           empty: $('#header-search-product-empty').html(),
//           suggestions: function(suggestions) {
//             return "<div></div>";
//
//           },
//           suggestion: function(suggestion) {
//             suggestion.last_categorie = suggestion.categories[suggestion.categories.length-1];
//             suggestion.price = suggestion.price[default_role];
//             var template = Hogan.compile($('#product-hit-template').html());
//             suggestion.helpers = hogan_helpers;
//             return template.render(suggestion);
//           }
//         }
//       },
//       {
//         source: availableTags,
//         displayKey: 'name',
//         name: 'category',
//         cssClasses: {
//           suggestions:" row",
//           suggestion: " col-12",
//         },
//         templates: {
//           header: function(query, result){
//             return search_template_title($('#header-search-category-title'), result);
//           },
//           empty: $('#header-search-category-empty').html(),
//           suggestion: function(suggestion) {
//             var template = Hogan.compile($('#category-hit-template').html());
//             suggestion.helpers = hogan_helpers;
//             return template.render(suggestion)
//           }
//         }
//       }
//     ]
//   );
//   });
//   $('body').click(function(element){
//     console.log(element);
//     if($(element.target).parents('.algolia-autocomplete').length == 0) {
//       console.log('closed');
//       $('#header-search-input').autocomplete('close');
//     }
//   });
// });
