import { DataTypes, Model, ValidationError } from "sequelize";
import sequelize from "../../../../Database/MySQL/Database";
import validator from "validator";

export class UserModel extends Model {
    uuid!: string;
    name!: string;
    email!: string;
    password!: string;
    sesionToken?: string|null;
}

UserModel.init({
    uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    email: {
        type: DataTypes.STRING, unique: { name: 'email', msg: 'Email is already in use' }, allowNull: false, validate: {
            isEmail: { msg: 'Must be a valid email address' }
        }
    },
    password: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notEmpty: {
                msg: 'Password is required'
            },
            isSecure(value: string) {
                if (!validator.isStrongPassword(value)) {
                    throw new Error('Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character', );
                }
            }
        }
    },
    sesionToken: { type: DataTypes.STRING, allowNull: true }
}, {
    sequelize, modelName: 'users', hooks: {
        beforeValidate: (user: UserModel, options) => {
            if (user.email) {
                user.email = user.email.toLowerCase();
            }
        }
    }, timestamps: false
});