// <script src="https://unpkg.com/babel-standalone@6.26.0/babel.min.js" crossorigin="anonymous"></script>
//
// $(document).ready(function() {
//   var searchkit =  new Searchkit.SearchkitManager("http://localhost:9200/demo_elasticsearch_backend_shopinvader_variant_en_us/odoo");
//
//   // exemple de: http://docs.searchkit.co/stable/components/basics/search-box.html
//   class App extends Searchkit.SearchkitComponent {
//     render() {
//       React.createElement("div", null, React.createElement(SearchBox, {
//         searchOnChange: true,
//         queryOptions: {
//           analyzer: "standard"
//         },
//         queryFields: ["title^5", "languages", "text"]
//       }));
//     }
//   }
//
//   // pour les hits: http://docs.searchkit.co/stable/components/basics/hits.html
//   const HitItem = (props) => (
//     <div className={props.bemBlocks.item().mix(props.bemBlocks.container("item"))}>
//       <img className={props.bemBlocks.item("poster")} src={props.result._source.poster}/>
//       <div className={props.bemBlocks.item("title")} dangerouslySetInnerHTML={{__html: get(props.result,"highlight.title",props.result._source.title)}}></div>
//     </div>
//   )
//
//   class App extends SearchkitComponent {
//
//     render(){
//       <div>
//         <Hits hitsPerPage={50} highlightFields={["title"]} sourceFilter={["title", "poster", "imdbId"]}
//         mod="sk-hits-grid" itemComponent={HitItem}/>
//       </div>
//     }
//   }
//
// });

$(document).ready(function() {
  // var searchkit =  new Searchkit.SearchkitManager("http://localhost:9200/demo_elasticsearch_backend_shopinvader_variant_en_us/odoo");
  //
  // var create = React.createElement;
  //
  // //const element = React.createElement("<SearchkitProvider searchkit={searchkit}> <div> <SearchBox/> <Hits/> </div> </SearchkitProvider>");
  // var hits = create(Searchkit.Hits, {hitsPerPage : 10}, null);
  // var searchBox = create(Searchkit.SearchBox, {
  //   searchOnChange:true,
  //   queryFields : ["name^5"]
  // }, null)
  // var div = create("div", null, " ", searchBox, " ", hits, " ")
  // const element = create(
  //   Searchkit.SearchkitProvider,
  //   {searchkit: searchkit},
  //   " ",
  //   div,
  //   " "
  // );
  //
  // //<searchkit searchkit={searchkit}>
  // ReactDOM.render(element, document.getElementsByClassName("container-fluid")[1]);
  //


});
