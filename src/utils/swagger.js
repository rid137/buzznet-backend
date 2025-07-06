const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

/** @type {import('swagger-jsdoc').Options} */
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'BuzzNet API',
            version: '1.0.0',
            description: 'API documentation for BuzzNet Backend',
        },
        servers: [
            {
                url: process.env.SWAGGER_SERVER_URL || 'http://localhost:8500/api',
                description: 'API server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1
                        },
                        firstName: {
                            type: 'string',
                            example: 'John'
                        },
                        lastName: {
                            type: 'string',
                            example: 'Doe'
                        },
                        userName: {
                            type: 'string',
                            example: 'johndoe'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            example: 'john@example.com'
                        },
                        role: {
                            type: 'string',
                            enum: ['user', 'admin'],
                            example: 'user'
                        },
                        isVerified: {
                            type: 'boolean',
                            example: false
                        },
                        profilePicture: {
                            type: 'string',
                            nullable: true,
                            example: 'https://example.com/profile.jpg'
                        }
                    }
                },
                Post: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        content: { type: 'string', example: 'This is my post content' },
                        media: { 
                        type: 'array',
                        items: { type: 'string' },
                        example: ['https://example.com/image1.jpg']
                        },
                        likes: { type: 'integer', example: 5 },
                        commentsCount: { type: 'integer', example: 3 },
                        userId: { type: 'integer', example: 1 },
                        status: { 
                        type: 'string',
                        enum: ['pending', 'approved', 'rejected'],
                        example: 'approved'
                        },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' },
                        user: {
                        type: 'object',
                        properties: {
                            id: { type: 'integer', example: 1 },
                            userName: { type: 'string', example: 'johndoe' },
                            firstName: { type: 'string', example: 'John' },
                            lastName: { type: 'string', example: 'Doe' }
                        }
                        }
                    }
                },
                PostCreate: {
                    type: 'object',
                    required: ['content'],
                    properties: {
                        content: { 
                        type: 'string',
                        minLength: 1,
                        example: 'This is my new post content'
                        },
                        media: {
                        type: 'array',
                        items: { type: 'string' },
                        example: ['https://example.com/image1.jpg']
                        }
                    }
                },
                PostStatusUpdate: {
                    type: 'object',
                    required: ['status'],
                    properties: {
                        status: {
                        type: 'string',
                        enum: ['pending', 'approved', 'rejected'],
                        example: 'approved'
                        }
                    }
                },
                Comment: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        content: { type: 'string', example: 'This is a great post!' },
                        userId: { type: 'integer', example: 1 },
                        postId: { type: 'integer', example: 1 },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' },
                        user: {
                            type: 'object',
                            properties: {
                                id: { type: 'integer', example: 1 },
                                userName: { type: 'string', example: 'johndoe' },
                                firstName: { type: 'string', example: 'John' },
                                lastName: { type: 'string', example: 'Doe' }
                            }
                        }
                    }
                },
                CommentCreate: {
                    type: 'object',
                    required: ['content'],
                    properties: {
                        content: { 
                        type: 'string',
                        minLength: 1,
                        example: 'This is my comment on the post'
                        }
                    }
                },
                Like: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        userId: { type: 'integer', example: 1 },
                        postId: { type: 'integer', example: 1 },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' },
                        user: {
                        type: 'object',
                            properties: {
                                id: { type: 'integer', example: 1 },
                                userName: { type: 'string', example: 'johndoe' },
                                firstName: { type: 'string', example: 'John' },
                                lastName: { type: 'string', example: 'Doe' }
                            }
                        }
                    }
                },
                Follow: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        followerId: { type: 'integer', example: 1 },
                        followingId: { type: 'integer', example: 2 },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' },
                        follower: {
                            type: 'object',
                            properties: {
                                id: { type: 'integer', example: 1 },
                                userName: { type: 'string', example: 'user1' },
                                firstName: { type: 'string', example: 'John' },
                                lastName: { type: 'string', example: 'Doe' }
                            }
                        },
                        following: {
                            type: 'object',
                            properties: {
                                id: { type: 'integer', example: 2 },
                                userName: { type: 'string', example: 'user2' },
                                firstName: { type: 'string', example: 'Jane' },
                                lastName: { type: 'string', example: 'Smith' }
                            }
                        }
                    }
                },
                // UploadedFile: {
                //     type: 'object',
                //     properties: {
                //         url: { 
                //             type: 'string',
                //             example: 'https://res.cloudinary.com/example/image/upload/v1234567/sample.jpg'
                //         },
                //         public_id: {
                //             type: 'string',
                //             example: 'sample'
                //         },
                //         originalFilename: {
                //             type: 'string',
                //             example: 'sample.jpg'
                //         }
                //     }
                // },
                UploadResponse: {
                    type: 'object',
                    properties: {
                        success: { type: 'boolean', example: true },
                        uploadedFiles: {
                            type: 'array',
                            // items: { $ref: '#/components/schemas/UploadedFile' }
                            items: { 
                                type: 'object',
                                properties: {
                                    url: { 
                                        type: 'string',
                                        example: 'https://res.cloudinary.com/example/image/upload/v1234567/sample.jpg'
                                    },
                                    public_id: {
                                        type: 'string',
                                        example: 'sample'
                                    },
                                    originalFilename: {
                                        type: 'string',
                                        example: 'sample.jpg'
                                    }
                                }
                            }
                        },
                        count: { type: 'integer', example: 1 },
                        message: { 
                            type: 'string',
                            example: 'All files uploaded successfully'
                        }
                    }
                },
                DeviceToken: {
                    type: 'object',
                    properties: {
                        id: { 
                            type: 'integer', 
                            example: 1,
                        },
                        fcmToken: {
                            type: 'string',
                            example: 'cR1ZyV9oQ7...',
                        },
                        userId: {
                            type: 'integer',
                            example: 123,
                        },
                        platform: {
                            type: 'string',
                            enum: ['android', 'ios', 'web'],
                            example: 'web',
                        },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' },
                    }
                },
                DeviceRegistration: {
                    type: 'object',
                    required: ['fcmToken'],
                    properties: {
                        fcmToken: {
                            $ref: '#/components/schemas/DeviceToken/properties/fcmToken'
                        },
                        platform: {
                            $ref: '#/components/schemas/DeviceToken/properties/platform'
                        }
                    }
                },
                Pagination: {
                    type: 'object',
                    properties: {
                        currentPage: {
                            type: 'integer',
                            example: 1
                        },
                        perPage: {
                            type: 'integer',
                            example: 10
                        },
                        totalDocuments: {
                            type: 'integer',
                            example: 100
                        },
                        totalPages: {
                            type: 'integer',
                            example: 10
                        }
                    }
                },
                ErrorResponse: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: false,
                        },
                        message: {
                            type: 'string',
                            example: 'An error occurred',
                        },
                        error: {
                            type: 'object',
                            properties: {
                                code: {
                                    type: 'string',
                                    example: 'ERR_CODE',
                                },
                                statusCode: {
                                    type: 'integer',
                                    example: 400,
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                BadRequest: {
                    description: 'Bad Request',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/ErrorResponse' },
                            example: {
                                success: false,
                                message: 'Please fill all the inputs.',
                                error: {
                                    code: 'ERR_VALID',
                                    statusCode: 400,
                                },
                            },
                        },
                    },
                },
                Unauthorized: {
                    description: 'Unauthorized',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/ErrorResponse' },
                            example: {
                                success: false,
                                message: 'Unauthorized access.',
                                error: {
                                    code: 'ERR_AUTH',
                                    statusCode: 401,
                                },
                            },
                        },
                    },
                },
                Forbidden: {
                    description: 'Forbidden',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/ErrorResponse' },
                            example: {
                                success: false,
                                message: 'Forbidden resource.',
                                error: {
                                    code: 'ERR_FORBIDDEN',
                                    statusCode: 403,
                                },
                            },
                        },
                    },
                },
                NotFound: {
                    description: 'Not Found',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/ErrorResponse' },
                            example: {
                                success: false,
                                message: 'Requested resource not found.',
                                error: {
                                    code: 'ERR_NF',
                                    statusCode: 404,
                                },
                            },
                        },
                    },
                },
                Conflict: {
                    description: 'Conflict',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/ErrorResponse' },
                            example: {
                                success: false,
                                message: 'User already exists.',
                                error: {
                                    code: 'ERR_CONFLICT',
                                    statusCode: 409,
                                },
                            },
                        },
                    },
                },
                UnprocessableEntity: {
                    description: 'Unprocessable Entity',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/ErrorResponse' },
                            example: {
                                success: false,
                                message: 'Invalid input format.',
                                error: {
                                    code: 'ERR_UNPROCESSABLE',
                                    statusCode: 422,
                                },
                            },
                        },
                    },
                },
                InternalServerError: {
                    description: 'Internal Server Error',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/ErrorResponse' },
                            example: {
                                success: false,
                                message: 'Something went wrong.',
                                error: {
                                    code: 'ERR_INTERNAL',
                                    statusCode: 500,
                                },
                            },
                        },
                    },
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/docs/**/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
    // Swagger page
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Docs in JSON format
    app.get('/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    console.log(`Docs available at http://localhost:${port}/docs`);
}

module.exports = swaggerDocs;