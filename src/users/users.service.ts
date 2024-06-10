import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private readonly userModal: Model<User>) { }

    async findAll(role:any, @Res() res ): Promise<User[]> {
        try {
            let userData: User[];

            if (role) {
                userData = await this.userModal.find({ role }).exec();
            } else {
                userData = await this.userModal.find().exec();
            }
            return res.status(HttpStatus.OK).json({
                message: 'User Fetched successfully',
                data: userData,
            });
        } catch (error) {
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

   async findOne(id: number, @Res() res) {
        try {
            const userData =await this.userModal.findOne({ _id: id }).exec()
            return res.status(HttpStatus.OK).json({
                message: 'User Fetched successfully',
                data: userData,
            });
        } catch (error) {
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    create(user: User, @Res() res): Promise<User> {
        try {
            const userData = new this.userModal(user)
            userData.save()
            return res.status(HttpStatus.OK).json({
                message: 'User Created successfully',
                data: userData,
            });
        } catch (error) {
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(id: number, updatedFields: Partial<User>, @Res() res) {
        try {
            const { email, role, ...updatedData } = updatedFields;
            const updatedUserData = await this.userModal
                .findOneAndUpdate({ _id: id }, updatedData, { new: true })
                .exec();

            if (updatedUserData) {
                console.log('User updated successfully:', updatedUserData);
                return res.status(HttpStatus.OK).json({
                    message: 'User updated successfully',
                    data: updatedUserData,
                });
            } else {
                console.log('User not found');
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
        } catch (error) {
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    delete(id: number, @Res() res) {
        try {
            const removedUser = this.findOne(id, res);
            return res.status(HttpStatus.OK).json({
                message: 'User removed successfully',
            });
        } catch (error) {
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
