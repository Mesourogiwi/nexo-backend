import {Injectable, NotFoundException} from '@nestjs/common'
import {CreateAddressDto} from './dto/create-address.dto'
import {UpdateAddressDto} from './dto/update-address.dto'
import {PrismaService} from '../../prisma/prisma.service'
import {Address} from '@prisma/client'

@Injectable()
export class AddressService {
    constructor(private readonly prisma: PrismaService) {}
    async create(createAddressDto: CreateAddressDto): Promise<Address> {
        const address = await this.prisma.address.create({data: createAddressDto})
        return address
    }

    async findAll(): Promise<Address[]> {
        const addresses = await this.prisma.address.findMany()
        return addresses
    }

    async findOne(id: string): Promise<Address> {
        const address = await this.prisma.address.findUnique({where: {id}})

        if (!address) {
            throw new NotFoundException('Address not found')
        }

        return address
    }

    async update(id: string, updateAddressDto: UpdateAddressDto): Promise<Address> {
        const address = await this.prisma.address.findUnique({where: {id}})

        if (!address) {
            throw new NotFoundException('Address not found')
        }

        return this.prisma.address.update({where: {id}, data: updateAddressDto})
    }

    async remove(id: string) {
        const address = await this.prisma.address.findUnique({where: {id}})

        if (!address) {
            throw new NotFoundException('Address not found')
        }
        await this.prisma.address.delete({where: {id}})
    }
}
