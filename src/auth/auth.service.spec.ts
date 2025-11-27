import {Test, TestingModule} from '@nestjs/testing'
import {AuthService} from './auth.service'
import {PrismaService} from '../../prisma/prisma.service'
import {JwtService} from '@nestjs/jwt'
import {UnauthorizedException} from '@nestjs/common'
import {faker} from '@faker-js/faker/locale/pt_BR'
import * as bcrypt from 'bcrypt'

describe('AuthService', () => {
    let service: AuthService
    const prismaMock = {
        user: {
            findUnique: jest.fn()
        }
    }

    const jwtMockService = {
        sign: jest.fn()
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: PrismaService,
                    useValue: prismaMock
                },
                {
                    provide: JwtService,
                    useValue: jwtMockService
                }
            ]
        }).compile()

        service = module.get<AuthService>(AuthService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })

    describe('test signIn', () => {
        it('should throw error if user not found', async () => {
            const signInInput = {
                email: 'user@example.com',
                password: faker.internet.password()
            }

            await expect(service.signIn(signInInput)).rejects.toThrow(UnauthorizedException)
        })

        it('should return access token if credentials are valid', async () => {
            const userPassword = faker.internet.password()
            const signInInput = {
                email: 'user@example.com',
                password: await bcrypt.hash(userPassword, 10)
            }

            const accessToken = 'access_token'

            prismaMock.user.findUnique = jest.fn().mockResolvedValueOnce(signInInput)
            jwtMockService.sign = jest.fn().mockReturnValueOnce(accessToken)

            const result = await service.signIn({
                email: signInInput.email,
                password: userPassword
            })

            expect(result.accessToken).toBeDefined()
            expect(result.user).toBeDefined()
            expect(result.user.email).toEqual(signInInput.email)
        })
    })
})
