<?php
return [
    'default-sp' => [
        'saml:SP',
        'entityID' => 'http://localhost:8080/simplesaml/module.php/saml/sp/metadata.php/default-sp',
        'idp' => 'http://localhost:8080/simplesaml/saml2/idp/metadata.php',
    ],
    'test-idp' => [
        'saml:IDP',
        'privatekey' => 'saml.pem',
        'certificate' => 'saml.crt',
        'attributes' => [
            'uid' => ['testuser'],
            'email' => ['testuser@example.com'],
            'groups' => ['admin'],
        ],
    ],
];
