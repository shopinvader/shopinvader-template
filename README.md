# ShopInvader Demonstration template

shopinvader-template is an open-source template for ShopInvader the
e-commerce solution for Odoo.

See [shopinvader.com](https://shopinvader.com)

![ShopInvader template](https://imgur.com/7PiaRFZ)
![ShopInvader template screenshot](https://imgur.com/7PiaRFZ "shopinvader template screenshot")

## About
This template provides a solid and flexible foundation for building a new
ShopInvader webshop. You can extend and adapt this theme to meet your webshop requirements.
See the live demo [https://shopinvader.com/template](https://shopinvader.com/template/)

## Requirement

Unless you use the Docker images described later, to preview this template locally you need to install
[Wagon](https://github.com/locomotivecms/wagon) the LocomotiveCMS command line
tool for developping your website on your local machine.

Please, read the documentation of Locomotive:
[http://locomotive-v3.readme.io](http://locomotive-v3.readme.io)

## Documentation

See [https://akretion.github.io/shopinvader-documentation/](https://akretion.github.io/shopinvader-documentation/).

## Installation

Clone this repository and move into your LocomotiveCMS folder.

```bash
$ git clone https://github.com/shopinvader/shopinvader-template.git YOUR_SITE_NAME
```

### Launch with docker-compose

Run the container with bash

```bash
cd YOUR_SITE_NAME
docker-compose run --service-ports wagon gosu ubuntu bash
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

