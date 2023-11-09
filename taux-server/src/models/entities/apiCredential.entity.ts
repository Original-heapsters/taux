import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

export enum ApiCredentialProvider {
    SPOTIFY = "spotify"
};

@Entity()
export class ApiCredential {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 300 })
  token: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  expiration: Date;

  @Column({
        type: "enum",
        enum: ApiCredentialProvider,
        default: ApiCredentialProvider.SPOTIFY
    })
  provider: ApiCredentialProvider;
  
}
