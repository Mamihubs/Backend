
// swagger middleware
import swaggerJSDoc from 'swagger-jsdoc'

const swaggerDocOptions:swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'MamiHub Project API Documentation',
            version: '1.0.0',
            description: 'Find the most updated documentation for MamiHub project by Kelvin',
        },
        servers: [
            {
                url: 'http://localhost:8081',
                description: 'Development server',
            },
        ],
        components: {
            schemas: {
                CreateUserRequestBody: {
                    type: 'object',
                    properties: {
                        firstName: { type: 'string' },
                        lastName: { type: 'string' },
                        email: { type: 'string' },
                        password: { type: 'string' }
                    },
                    required: ['firstName', 'lastName', 'email', 'password'],
                },
                CreateUserResponse: {
                    type: 'object',
                    properties: {
                        status: { type: 'boolean' },
                        message: { type: 'string' },
                        data: {
                            type: 'object',
                            properties: {
                                _id: { type: 'string'},
                                name: { type: 'string' },
                                email: { type: 'string' }
                            }
                        }
                    },
                },
                CreateVendorRequestBody: {
                    type: 'object',
                    properties: {
                        firstName: { type: 'string' },
                        lastName: { type: 'string' },
                        email: { type: 'string' },
                        phoneNumber: { type: 'string' },
                        storeName: { type: 'string' },
                        storeDescription: { type: 'string' },
                        password: { type: 'string' }
                    },
                    required: ['firstName', 'lastName', 'email', 'phoneNumber', 'storeName', 'storeDescription', 'password'],
                },
                CreateVendorResponse: {
                    type: 'object',
                    properties: {
                        status: { type: 'boolean' },
                        message: { type: 'string' },
                        data: {
                            type: 'object',
                            properties: {
                                _id: { type: 'string'},
                                name: { type: 'string' },
                                email: { type: 'string' }
                            }
                        }
                    },
                },

                LoginUserRequestBody: {
                    type: 'object',
                    properties: {
                        email: { type: 'string' },
                        password: { type: 'string' }
                    },
                    required: [ 'email', 'password'],
                },

                LoginUserResponse: {
                    type: 'object',
                    properties: {
                        status: { type: 'boolean' },
                        message: { type: 'string' },
                        token: { type: 'string' },
                        user: {
                            type: 'object',
                            properties: {
                                _id: { type: 'string'},
                                name: { type: 'string' },
                                email: { type: 'string' }
                            }
                        }
                    },
                },

                GetUserWalletsResponse: {
                    type: 'object',
                    properties: {
                        error: { type: 'boolean', default: false   },
                        data: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    _id: { type: 'string'},
                                    name: { type: 'string' },
                                    amount: { type: 'number' },
                                    user: { type: 'string'},
                                    created_by: {
                                        type: "object",
                                        properties: {
                                            _id: { type: 'string'},
                                            name: { type: 'string' },
                                            email: { type: 'string' }
                                        }
                                    },
                                    updated_by: {
                                        type: "object",
                                        properties: {
                                            _id: { type: 'string'},
                                            name: { type: 'string' },
                                            email: { type: 'string' }
                                        }
                                    }
    
                                }
                            }
                        }
                    },
                },

                AdminDashboardResponse: {
                    type: 'object',
                    properties: {
                        sales: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    _id: { type: 'string'},
                                    order_by: { type: 'string' },
                                    company: { type: 'string' },
                                    payment_method: { type: 'string'}
                                }
                            }
                        },
                        products: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    _id: { type: 'string'},
                                    product_name: { type: 'string' },
                                    product_desc: { type: 'string' },
                                    brand: { type: 'string'},
                                }
                            }
                        },
                        orders: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    _id: { type: 'string'},
                                    amount_total: { type: 'number' },
                                    total_tax: { type: 'number' },
                                    total_insurance: { type: 'number'},
                                    delivery_fee: { type: 'number'},
                                }
                            }
                        }
                    },
                },

                AdminProductsResponse: {
                    type: 'object',
                    properties: {
                        products: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    _id: { type: 'string'},
                                    product_name: { type: 'string' },
                                    product_desc: { type: 'string' },
                                    brand: { type: 'string'},
                                }
                            }
                        }
                    },
                },

                AdminVendorDetailsResponse: {
                    type: 'object',
                    properties: {
                        profile: {
                            type: 'object',
                            properties: {
                                _id: { type: 'string'},
                                firstName: { type: 'string' },
                                lastName: { type: 'string' },
                                email: { type: 'string' },
                            },
                        },
                        identity_company: {
                            type: 'object',
                            properties: {
                                _id: { type: 'string'},
                                company_name: { type: 'string' },
                                address: { type: 'string' },
                                manager_number: { type: 'string' },
                                company_size: { type: 'number' },
                                identity_card: { type: 'string' },
                                user: {
                                    type: "object",
                                    properties: {
                                        _id: { type: 'string'},
                                        firstName: { type: 'string' },
                                        lastName: { type: 'string' },
                                        email: { type: 'string' },
                                    }
                                }
                                }
                            },
                        identity_individual: {
                            type: 'object',
                            properties: {
                                _id: { type: 'string'},
                                institute_name: { type: 'string' },
                                graduation_date: { type: 'string' },
                                identity_card: { type: 'string' },
                                passport: { type: 'string' },
                                user: {
                                    type: "object",
                                    properties: {
                                        _id: { type: 'string'},
                                        firstName: { type: 'string' },
                                        lastName: { type: 'string' },
                                        email: { type: 'string' },
                                    }
                                }

                            },
                        },
                        bank: {
                            type: 'object',
                            properties: {
                                _id: { type: 'string'},
                                bank_name: { type: 'string' },
                                account_name: { type: 'string' },
                                account_number: { type: 'string' },
                                account_type: { type: 'string' },
                                bank_swiftcode: { type: 'string' },
                                bank_branch: { type: 'string' },

                                user: {
                                    type: "object",
                                    properties: {
                                        _id: { type: 'string'},
                                        firstName: { type: 'string' },
                                        lastName: { type: 'string' },
                                        email: { type: 'string' },
                                    }
                                }

                            },
                        },
                        business: {
                            type: 'object',
                            properties: {
                                _id: { type: 'string'},
                                account_type: { type: 'string' },
                                firstname: { type: 'string' },
                                lastname: { type: 'string' },
                                middlename: { type: 'string' },
                                zip: { type: 'string' },
                                referral_code: { type: 'string' },
                                business_registered: { type: 'string' },
                                document: { type: 'string' },
                                cac_reg_number: { type: 'string' },
                                user: {
                                    type: "object",
                                    properties: {
                                        _id: { type: 'string'},
                                        firstName: { type: 'string' },
                                        lastName: { type: 'string' },
                                        email: { type: 'string' },
                                    }
                                }

                            },
                        }
                    }
                },

                AdminVendorsResponse: {
                    type: 'object',
                    properties: {
                        users: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    _id: { type: 'string'},
                                    fullName: { type: 'string' },
                                    active: { type: 'boolean' },
                                }
                            }
                        }
                    },
                },

                AdminCustomersResponse: {
                    type: 'object',
                    properties: {
                        users: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    _id: { type: 'string'},
                                    fullName: { type: 'string' },
                                    active: { type: 'boolean' },
                                }
                            }
                        }
                    },
                },

                AdminOrdersResponse: {
                    type: 'object',
                    properties: {
                        orders: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    _id: { type: 'string'},
                                    amount_total: { type: 'number' },
                                    total_tax: { type: 'number' },
                                    total_insurance: { type: 'number'},
                                    delivery_fee: { type: 'number'},
                                }
                            }
                        }
                    },
                },

                AdminIntegrationResponse: {
                    type: 'object',
                    properties: {
                        integration: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    _id: { type: 'string'},
                                }
                            }
                        }
                    },
                },

                AdminSettingsResponse: {
                    type: 'object',
                    properties: {
                        settings: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    _id: { type: 'string'},
                                }
                            }
                        }
                    },
                },


                AdminVendorDataResponse: {
                    type: 'object',
                    properties: {
                        users: {
                                type: 'object',
                                properties: {
                                    _id: { type: 'string'},
                                    fullName: { type: 'string' },
                                    active: { type: 'boolean' },
                                }
                        },
                        profile: {
                            type: 'object',
                            properties: {
                                _id: { type: 'string'},
                                firstName: { type: 'string' },
                                lastName: { type: 'string' },
                                email: { type: 'string' },
                            },
                        },

                        sales: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    _id: { type: 'string'},
                                    order_by: { type: 'string' },
                                    company: { type: 'string' },
                                    payment_method: { type: 'string'}
                                }
                            }
                        },
                        products: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    _id: { type: 'string'},
                                    product_name: { type: 'string' },
                                    product_desc: { type: 'string' },
                                    brand: { type: 'string'},
                                }
                            }
                        },
                        orders: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    _id: { type: 'string'},
                                    amount_total: { type: 'number' },
                                    total_tax: { type: 'number' },
                                    total_insurance: { type: 'number'},
                                    delivery_fee: { type: 'number'},
                                }
                            }
                        }
                    }
                },

                UpdateUserResponse: {
                    type: 'object',
                    properties: {
                        user: {
                            type: 'object',
                            properties: {
                                _id: { type: 'string'},
                                name: { type: 'string' },
                                email: { type: 'string' }
                            }
                        }
                    },
                },

                SingleOrderResponse: {
                    type: 'object',
                    properties: {
                        data: {
                            type: 'object',
                            properties: {
                                _id: { type: 'string'},
                                amount_total: { type: 'number' },
                                total_tax: { type: 'number' },
                                total_insurance: { type: 'number'},
                                delivery_fee: { type: 'number'},
                            }
                        }
                    },
                },

                SingleProductResponse: {
                    type: 'object',
                    properties: {
                        data: {
                            type: 'object',
                            properties: {
                                _id: { type: 'string'},
                                product_name: { type: 'string' },
                                product_desc: { type: 'string' },
                                brand: { type: 'string'},
                            }
                        }
                    },
                },


                CreateCategoryRequestBody: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        parentId: { type: 'string' },
                        parentPath: { type: 'string' },
                        createdBy: { type: 'string' },
                        updatedBy: { type: 'string' },
                    }
                },
                CreateCategoryResponse: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        name: { type: 'string' },
                        parentId: { type: 'string' },
                        parentPath: { type: 'string' },
                        createdBy: { 
                            type: 'object',
                            properties: {
                                _id: { type: 'string'},
                                name: { type: 'string' },
                                email: { type: 'string' }
                            }
                        },
                        updatedBy: { 
                            type: 'object',
                            properties: {
                                _id: { type: 'string'},
                                name: { type: 'string' },
                                email: { type: 'string' }
                            }
                        },
    
                    }
                },
    
                CategoriesResponse: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            _id: { type: 'string' },
                            name: { type: 'string' },
                            parentId: { type: 'string' },
                            parentPath: { type: 'string' },
                            createdBy: { 
                                type: 'object',
                                properties: {
                                    _id: { type: 'string'},
                                    name: { type: 'string' },
                                    email: { type: 'string' }
                                }
                            },
                            updatedBy: { 
                                type: 'object',
                                properties: {
                                    _id: { type: 'string'},
                                    name: { type: 'string' },
                                    email: { type: 'string' }
                                }
                            },
    
                        }
                    }
    
                },
    
                updateCategoryResponse: {
                    type: 'object',
                    properties: {
                        status: { type: 'boolean' },
                        message: { type: 'string' },
                        data: { 
                            type: 'object',
                            properties: {
                                _id: { type: 'string' },
                                name: { type: 'string' },
                                parentId: { type: 'string' },
                                parentPath: { type: 'string' },
                                createdBy: { 
                                    type: 'object',
                                    properties: {
                                        _id: { type: 'string'},
                                        name: { type: 'string' },
                                        email: { type: 'string' }
                                    }
                                },
                                updatedBy: { 
                                    type: 'object',
                                    properties: {
                                        _id: { type: 'string'},
                                        name: { type: 'string' },
                                        email: { type: 'string' }
                                    }
                                },
        
                            }
                        }
                    }
                },

                AddAddressRequestBody: {
                    type: 'object',
                    properties: {
                        address: { type: 'string' },
                        contact: { type: 'string' },
                        default: { type: 'boolean' },
                        user: { type: 'string' }
                    },
                    required: ['address', 'contact', 'default', 'user'],
                },

                AddressResponse: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        address: { type: 'string' },
                        contact: { type: 'string' },
                        default: { type: 'boolean' },
                        user: { 
                            type: 'object',
                            properties: {
                                _id: { type: 'string'},
                                name: { type: 'string' },
                                email: { type: 'string' }
                            }
                         }
                    }
                },

                CreateLikeItemRequestBody: {
                    type: 'object',
                    properties: {
                        user: { type: 'string' },
                        product: { type: 'string' },
                    },
                    required: ['product', 'user'],
                },

                LikedProductResponse: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        user: { 
                            type: 'object',
                            properties: {
                                _id: { type: 'string'},
                                name: { type: 'string' },
                                email: { type: 'string' }
                            }
                         },
                         product: { 
                            type: 'object',
                            properties: {
                                _id: { type: 'string'},
                                product_name: { type: 'string' },
                                product_desc: { type: 'string' },
                                brand: { type: 'string'},
                            }
                         }
                    }
                },

                RegionResponse: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        name: { type: 'string' },
                        createdBy: { 
                            type: 'object',
                            properties: {
                                _id: { type: 'string'},
                                name: { type: 'string' },
                                email: { type: 'string' }
                            }
                         },
                         updatedBy: { 
                            type: 'object',
                            properties: {
                                _id: { type: 'string'},
                                name: { type: 'string' },
                                email: { type: 'string' }
                            }
                         }
                    }
                },

                LocationResponse: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        location: { type: 'string' },
                        address: { type: 'string' },
                        phoneNo: { type: 'string' },
                        region: {
                            type: 'object',
                            properties: {
                                _id: { type: 'string' },
                                name: { type: 'string' },
                                createdBy: { 
                                    type: 'object',
                                    properties: {
                                        _id: { type: 'string'},
                                        name: { type: 'string' },
                                        email: { type: 'string' }
                                    }
                                },
                                updatedBy: { 
                                    type: 'object',
                                    properties: {
                                        _id: { type: 'string'},
                                        name: { type: 'string' },
                                        email: { type: 'string' }
                                    }
                                }
                            }
                        },
                        createdBy: { 
                            type: 'object',
                            properties: {
                                _id: { type: 'string'},
                                name: { type: 'string' },
                                email: { type: 'string' }
                            }
                        },
                        updatedBy: { 
                            type: 'object',
                            properties: {
                                _id: { type: 'string'},
                                name: { type: 'string' },
                                email: { type: 'string' }
                            }
                        }
                    }
                },
                

                NotificationResponse: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        message: { type: 'string' },
                        status: { type: 'string' },
                        updatedAt: { type: 'string' },
                        createdAt: { type: 'string' },
                        user: { 
                            type: 'object',
                            properties: {
                                _id: { type: 'string'},
                                name: { type: 'string' },
                                email: { type: 'string' }
                            }
                        },
                    }
                },

                CreateBusinessRequest: {
                    type: 'object',
                    allOf: [
                        {
                            properties: {
                              image: {
                                type: 'string',
                                format: 'binary',
                              },
                            },
                            required: ['image'],
                        },
                        { $ref: '#/components/schemas/BaseBusinessRequest' },
                      
                    ],
                  },

                  BaseBusinessRequest: {
                    type: 'object',
                    properties: {
                        account_type: { type: 'string' },
                        firstname: { type: 'string' },
                        lastname: { type: 'string' },
                        middlename: { type: 'string' },
                        zip: { type: 'string' },
                        referral_code: { type: 'string' },
                        business_registered: { type: "boolean" },
                        document: { type: 'string' },
                        cac_reg_number: { type: 'string' },

                    }
                },

                BusinessResponse: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        account_type: { type: 'string' },
                        firstname: { type: 'string' },
                        lastname: { type: 'string' },
                        middlename: { type: 'string' },
                        zip: { type: 'string' },
                        referral_code: { type: 'string' },
                        business_registered: { type: "boolean" },
                        document: { type: 'string' },
                        cac_reg_number: { type: 'string' },
                    }
                },

                CreateBankRequestBody: {
                    type: 'object',
                    properties: {
                        user: { type: 'string'},
                        account_name: { type: 'string' },
                        account_number: { type: 'string' },
                        account_type: { type: 'string' },
                        bank_name: { type: 'string' },
                        bank_branch: { type: 'string' },
                        bank_swiftcode: { type: 'string' },
    
                    }
                },

                BankResponse: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        account_name: { type: 'string' },
                        account_number: { type: 'string' },
                        account_type: { type: 'string' },
                        bank_name: { type: 'string' },
                        bank_branch: { type: 'string' },
                        bank_swiftcode: { type: 'string' },
                        user: { 
                            type: 'object',
                            properties: {
                                _id: { type: 'string'},
                                name: { type: 'string' },
                                email: { type: 'string' }
                            }
                        },

                    }
                },

                CreateIdentityIndividualRequestBody: {
                    type: 'object',
                    properties: {
                        user: { type: 'string'},
                        institute_name: { type: 'string' },
                        graduation_date: { type: 'string' },
                        identity_card: { type: 'string' },
                        passport: { type: 'string' },
                    }
                },

                IdentityIndividualResponse: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        institute_name: { type: 'string' },
                        graduation_date: { type: 'string' },
                        identity_card: { type: 'string' },
                        passport: { type: 'string' },
                        user: { 
                            type: 'object',
                            properties: {
                                _id: { type: 'string'},
                                name: { type: 'string' },
                                email: { type: 'string' }
                            }
                        },
                    }
                },

                CreateIdentityCompanyRequestBody: {
                    type: 'object',
                    properties: {
                        user: { type: 'string'},
                        company_name: { type: 'string' },
                        company_size: { type: 'number' },
                        address: { type: 'string' },
                        manager_number: { type: 'string' },
                        identity_card: { type: 'string' },
                        passport: { type: 'string' },
                    }
                },

                IdentityCompanyResponse: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        company_name: { type: 'string' },
                        company_size: { type: 'number' },
                        address: { type: 'string' },
                        manager_number: { type: 'string' },
                        identity_card: { type: 'string' },
                        passport: { type: 'string' },
                        user: { 
                            type: 'object',
                            properties: {
                                _id: { type: 'string'},
                                name: { type: 'string' },
                                email: { type: 'string' }
                            }
                        },
                    }
                },

                PaystackBaseRequest: {
                    type: 'object',
                    properties: {
                        paystackReference: { type: 'string' },
                        paymentDate: { type: 'string' },
                        payedCart: { type: 'array' },
                        amountPayed: { type: 'number' }
                    }
                },

                ProfileBaseRequest: {
                    type: 'object',
                    properties: {
                        firstName: { type: 'string' },
                        middleName: { type: 'string' },
                        lastName: { type: 'string' },
                        email: { type: 'string' },
                        phoneNumber: { type: 'string' },
                        street1: { type: 'string' },
                        street2: { type: 'string' },
                        dateOfBirth: { type: 'string' },
                        stateOfOrigin: { type: 'string' },
                        identificationDoc: { type: 'string' },
                        identificationNum: { type: 'string' },
                        identificationName: { type: 'string' },
                        passport: { type: 'string' },
                        active: { type: 'boolean' },
                        accountStatus: { type: 'string' },
                        storeName: { type: 'string' },
                        storeDescription: { type: 'string' },
                        createdBy: { type: "string"},
                        updatedBy: { type: "string"}

                    }
                },

                ProfileResponse: {
                    type: 'object',
                    allOf: [
                        { $ref: '#/components/schemas/ProfileBaseRequest' },
                        {
                            properties: {
                                _id: { type: 'string'},
                                createdBy: { 
                                    type: 'object',
                                    properties: {
                                        _id: { type: 'string'},
                                        name: { type: 'string' },
                                        email: { type: 'string' }
                                    }
                                },
                                updatedBy: { 
                                    type: 'object',
                                    properties: {
                                        _id: { type: 'string'},
                                        name: { type: 'string' },
                                        email: { type: 'string' }
                                    }
                                },
                            },
                        },
                      
                    ]
                },


                ProductResponse: {
                    type: 'object',
                    allOf: [
                        {
                            properties: {
                                _id: { type: 'string'},
                            },
                        },
                        { $ref: '#/components/schemas/BaseProductRequest' },
                      
                    ]
                },

                BaseProductRequest: {
                    type: 'object',
                    properties: {
                        product_name: { type: 'string' },
                        product_desc: { type: 'string' },
                        brand: { type: 'string'},
                        status: { type: 'boolean' },
                        created_by: { type: 'string'},
                        price_discount: { type: 'integer' },
                        product_price: { type: 'string' },
                        product_sku: { type: 'string' },
                        product_quantity: { type: 'integer'},
                        other_info: { type: 'string' },
                        images: { 
                            type: 'array' ,
                            items: { type: 'string'}
                        },
                        tags: { 
                            type: 'array' ,
                            items: { type: 'string'}
                        },
                        variations: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    variation: { type: 'string'},
                                    price: { type: 'number' },
                                    state: { type: 'string' },
                                    barcode: { type: 'string'},
                                    volume: { type: 'number' },
                                    weight: { type: 'string' },
                                    color: { type: 'string'},
                                    quantity: { type: 'string'},
                                }
                            }
                        },

                        shipping: {
                            type: 'object',
                            properties: {
                                weight: { type: 'string'},
                                height: { type: 'number' },
                                width: { type: 'string' },
                                length: { type: 'string'},
                                
                            }
                        }
                    }
                },

                PromotionPlanResponse: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        plan_type: { type: 'string' },
                        duration: { type: 'string' },
                        amount: { type: 'string' },

                    }
                },

                PromotionRequest: {
                    type: 'object',
                    properties: {
                        user: { type: 'string' },
                        plan_type: { type: 'string' },
                        product: { type: 'string' },
                        clicks: { type: 'number' },
                        impressions: { type: 'number' }

                    }
                },

                PromotionResponse: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        impressions: { type: 'number' },
                        clicks: { type: 'number' },
                        expired_by: { type: 'string' },
                        user: { 
                            type: 'object',
                            properties: {
                                _id: { type: 'string'},
                                email: { type: 'string' }
                            }
                        },
                        plan_type: { 
                            type: 'object',
                            properties: {
                                _id: { type: 'string' },
                                plan_type: { type: 'string' },
                                duration: { type: 'string' },
                                amount: { type: 'string' },
                            }
                        },
                        product: { 
                            type: 'object',
                            properties: {
                                _id: { type: 'string'},
                                product_name: { type: 'string' },
                                product_desc: { type: 'string' },
                                brand: { type: 'string'},
                            }
                        },

                    }
                },

                SalesBaseRequest: {
                    
                },

                SalesRequest: {
                    type: 'object',
                    properties: {
                        phone: { type: 'string' },
                        address: { type: 'string' },
                        payment_method: { type: 'string' },

                        date_ordered: { type: 'string' },
                        date_delivered: { type: 'string' },

                        amount_total: { type: 'number' },
                        total_tax: { type: 'number' },
                        total_insurance: { type: 'number' },

                        delivery_fee: { type: 'number' },
                        delivery_status: { type: 'number' },

                        order_by: { type: 'string' },
                        updated_by: { type: 'string' },
                        company: { type: 'string' },
                        currency_id: { type: 'string'},
                        items: { 
                            type: 'array',
                            item: {
                                type: 'object',
                                properties: {
                                    _id: { type: 'string'},
                                    quantity: { type: 'number' },
                                    variation: { type: 'string' },
                                    price: { type: 'number' },
                                    product: { 
                                        type: 'object',
                                        properties: {
                                            _id: { type: 'string'},
                                            product_name: { type: 'string' },
                                            product_desc: { type: 'string' },
                                            brand: { type: 'string'},
                                        }
                                    },
                                }
                            }
                        }, 

                        

                    }
                },

                SalesResponse: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        phone: { type: 'string' },
                        address: { type: 'string' },
                        payment_method: { type: 'string' },

                        date_ordered: { type: 'string' },
                        date_delivered: { type: 'string' },

                        amount_total: { type: 'number' },
                        total_tax: { type: 'number' },
                        total_insurance: { type: 'number' },

                        delivery_fee: { type: 'number' },
                        delivery_status: { type: 'number' },

                        order_by: { 
                            type: 'object',
                            properties: {
                                _id: { type: 'string'},
                                name: { type: 'string' },
                                email: { type: 'string' }
                            }
                        },
                        updated_by: { 
                            type: 'object',
                            properties: {
                                _id: { type: 'string'},
                                name: { type: 'string' },
                                email: { type: 'string' }
                            }
                        },
                        company: { 
                            type: 'object',
                            properties: {
                                _id: { type: 'string'},
                                company_name: { type: 'string' },
                                address: { type: 'string' },
                                manager_number: { type: 'string' },
                                company_size: { type: 'number' },
                                identity_card: { type: 'string' },
                            }
                        },

                        items: { 
                            type: 'array',
                            item: {
                                type: 'object',
                                properties: {
                                    _id: { type: 'string'},
                                    quantity: { type: 'number' },
                                    variation: { type: 'string' },
                                    price: { type: 'number' },
                                    product: { 
                                        type: 'object',
                                        properties: {
                                            _id: { type: 'string'},
                                            product_name: { type: 'string' },
                                            product_desc: { type: 'string' },
                                            brand: { type: 'string'},
                                        }
                                    },
                                }
                            }
                        }, 

                        currency_id: {
                            type: 'object',
                            properties: {
                                _id: { type: 'string'},
                                name: { type: 'string' },
                                symbol: { type: 'string' },
                                decimal_places: { type: 'number'},
                                active: { type: 'boolean' },
                                created_by: { 
                                    type: 'object',
                                    properties: {
                                        _id: { type: 'string'},
                                        name: { type: 'string' },
                                        email: { type: 'string' }
                                    }
                                },
                                updated_by: { 
                                    type: 'object',
                                    properties: {
                                        _id: { type: 'string'},
                                        name: { type: 'string' },
                                        email: { type: 'string' }
                                    }
                                },
                            }
                        }

                    }
                },

                SalesOrderResponse: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        access_token: { type: 'string' },
                        name: { type: 'string' },
                        origin: { type: 'string' },
                        client_order_ref: { type: 'string' },
                        reference: { type: 'string' },
                        state: { type: 'string' },
                        date_ordered: { type: 'string' },
                        validity_date: { type: 'string' },
                        amount_total: { type: 'number' },
                        total_tax: { type: 'number' },
                        total_insurance: { type: 'number' },
                        delivery_fee: { type: 'number' },
                        created_by: { 
                            type: 'object',
                            properties: {
                                _id: { type: 'string'},
                                name: { type: 'string' },
                                email: { type: 'string' }
                            }
                        },
                        updated_by: { 
                            type: 'object',
                            properties: {
                                _id: { type: 'string'},
                                name: { type: 'string' },
                                email: { type: 'string' }
                            }
                        },
                        user_id: { 
                            type: 'object',
                            properties: {
                                _id: { type: 'string'},
                                name: { type: 'string' },
                                email: { type: 'string' }
                            }
                        },
                        profile: {
                            type: 'object',
                            properties: {
                                _id: { type: 'string'},
                                firstName: { type: 'string' },
                                lastName: { type: 'string' },
                                email: { type: 'string' },
                            },
                        },
                        currency_id: {
                            type: 'object',
                            properties: {
                                _id: { type: 'string'},
                                name: { type: 'string' },
                                symbol: { type: 'string' },
                                decimal_places: { type: 'number'},
                                active: { type: 'boolean' },
                                created_by: { 
                                    type: 'object',
                                    properties: {
                                        _id: { type: 'string'},
                                        name: { type: 'string' },
                                        email: { type: 'string' }
                                    }
                                },
                                updated_by: { 
                                    type: 'object',
                                    properties: {
                                        _id: { type: 'string'},
                                        name: { type: 'string' },
                                        email: { type: 'string' }
                                    }
                                },
                            }
                        }

                    }
                },

                WalletResponse: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        name: { type: 'string' },
                        state: { type: 'string' },
                        amount: { type: 'number' },
                        total_tax: { type: 'number' },
                        total_insurance: { type: 'number' },
                        delivery_fee: { type: 'number' },
                        created_by: { 
                            type: 'object',
                            properties: {
                                _id: { type: 'string'},
                                name: { type: 'string' },
                                email: { type: 'string' }
                            }
                        },
                        updated_by: { 
                            type: 'object',
                            properties: {
                                _id: { type: 'string'},
                                name: { type: 'string' },
                                email: { type: 'string' }
                            }
                        },
                        user: { 
                            type: 'object',
                            properties: {
                                _id: { type: 'string'},
                                name: { type: 'string' },
                                email: { type: 'string' }
                            }
                        },
                    }
                }

               
            },
        }

    },
    // Path to the API docs
    apis: ['./src/routes/*.ts'], // Path to your TypeScript routes
};

export default swaggerDocOptions

// import swaggerAutogen from 'swagger-autogen';

// const options = {
//     info: {
//         version: 'v1.0.0',
//         title: 'MamiHub Project Documentation',
//         description: 'Find the most updated documentation for MamiHub project by Kelvin'
//     },
//     servers: [
//         {
//             url: 'http://localhost:8081',
//             description: ''
//         },
//     ],
//     components: {
//         securitySchemes: {
//             bearerAuth: {
//                 type: 'http',
//                 scheme: 'bearer',
//             }
//         }
//     }
// };

// export default options


// const outputFile = './swagger_output.json';
// const endpointsFiles = ['./routes/*.ts'];

// swaggerAutogen({openapi: '3.0.0'})(outputFile, endpointsFiles, options);
