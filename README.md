# ShopInvader Demonstration template

shopinvader-template is an open-source template for ShopInvader the
e-commerce solution with Odoo.

See [shopinvader.com](https://shopinvader.com)

![ShopInvader template](https://imgur.com/7PiaRFZ)
![ShopInvader template screenshot](https://imgur.com/7PiaRFZ "shopinvader template screenshot")

## About
This template  provide a solid and flexible foundation for building new
ShopInvader webshop. You can extend and adapt this theme to the shop's needs.

See live demo [https://shopinvader.com/template](https://shopinvader.com/template/)

## Requirement

For preview locally this template you need to install
[Wagon](https://github.com/locomotivecms/wagon) the LocomotiveCMS command line
tool for develop your website on your local machine.

Please, visit the documentation website of Locomotive.
[http://locomotive-v3.readme.io](http://locomotive-v3.readme.io)

## Documentation

See [https://akretion.github.io/shopinvader-documentation/](https://akretion.github.io/shopinvader-documentation/).

## Installation

Clone this repository and move into your LocomotiveCMS folder.

```bash
$ git clone https://github.com/akretion/shopinvader-template.git YOUR_SITE_NAME
bundle exec wagon serve

```

### Launch with docker-compose

Run the container with bash

```bash
cd YOUR_SITE_NAME
docker-compose run wagon gosu ubuntu bash
```

Now you are inside the container you can use wagon !

```bash
wagon serve
```

### Launch with docky

Run the container with bash

```bash
cd YOUR_SITE_NAME
docky run
```

Now you are inside the container you can use wagon !

```bash
wagon serve
```

### Wagon documentation

https://locomotive-v3.readme.io/docs

