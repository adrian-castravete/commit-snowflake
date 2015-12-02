Commit Snowflake
================

The idea behind the project is to generate a snowflake based on a given
hexadecimal input, such as a *Git Commit Number*.

Usage
-----

The standard interface gives you the **canvas** with a simple **input** text
field in which to introduce new values.
The given value is firstly tested to see if it's a correct *hexadecimal* number.
Should it not be one, the value is *converted* to a **SHA-1** hexadecimal
digest.

Contributing
------------

The project is licensed with the **MIT** licence and uses **npm**.
To get started do::

  npm install

To install the necessary dependencies.

After that there are two **gulp** commands made available::

  gulp build
  gulp watch

The first just builds the ``js/snowflake.js`` file while the second watches for
any changes in the ``*.js`` files from ``src/`` and launches the *build* step.

Future
------

The intention is to also create a **chrome/chromium** extension activateable on
*github* or *bitbucket*.
