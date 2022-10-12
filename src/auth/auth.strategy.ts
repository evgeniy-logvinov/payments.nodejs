import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        '-----BEGIN CERTIFICATE-----\nMIIDHDCCAgSgAwIBAgIIF3yfllsxk6owDQYJKoZIhvcNAQEFBQAwMTEvMC0GA1UE\nAwwmc2VjdXJldG9rZW4uc3lzdGVtLmdzZXJ2aWNlYWNjb3VudC5jb20wHhcNMjIx\nMDAyMDkzOTAyWhcNMjIxMDE4MjE1NDAyWjAxMS8wLQYDVQQDDCZzZWN1cmV0b2tl\nbi5zeXN0ZW0uZ3NlcnZpY2VhY2NvdW50LmNvbTCCASIwDQYJKoZIhvcNAQEBBQAD\nggEPADCCAQoCggEBAMTDF3pvTqbRngpPHgG+NxtKhSsHwQgLRcv4/FhSeo7IWrPN\nnNci83RmO0N4fvpV//YzkwXdgzVumg7+Dv26huIDpyoyf4BEiw0s+k7MoD47uVwg\nNA505ZRkvU7Gf9UldXRr0yxw5QjqdvkBySaCcs4ymAzwHr2T0TySCgNROp/rFHEU\nDoyVG9TVfufMgIXDUSC/BHcBkpTqlfL5ScE0c5j/KzHmFri5VkYz81NWSH0sQfXq\nFC94p2p824Qr8jg/S3RnuVVYMFgtvc+QacqIpeh6ZNPijRiuyAxb3cimVe3hs/ph\n1Dp8Rxkje4azw8UywwZtTSkVy8AO/hxc+T2T4xsCAwEAAaM4MDYwDAYDVR0TAQH/\nBAIwADAOBgNVHQ8BAf8EBAMCB4AwFgYDVR0lAQH/BAwwCgYIKwYBBQUHAwIwDQYJ\nKoZIhvcNAQEFBQADggEBABlIJvP5drK5xwOqfHm9vmRVuq3ke+bN95VKjlsRZurl\nlIBROwBBM/OCabxtMgu05na7RbJ0TylKnPJQFN0XmbV0u6EemiIs/foYlkSjf/bI\n144mw4igoaV/EsPvLyzz/9iiT1+TgoZNPgzFqv1b6x1UMJvIa8iCtQAsfHTH1cDs\nNVJoIaUYNaOhmvHSoEhFSGoJNSRVZ+AOFlygsnpr2SG5C2xgjmU3f6fhhBTnL6cs\nvQo7XMB3iYQPsIiYvw3a40jg/nWYHcKewZ2IWJitXAHt1bHT+dnS7fNcuha4eDmS\nNTkSMUw0jtnsQ6Lhs9LNnhBPu877faC3lTAB1yRgJ1Y=\n-----END CERTIFICATE-----\n',
    });
  }

  async validate(payload) {
    console.log(payload);
    const user = {
      user_id: payload.user_id,
      email: payload.email,
    };
    return user;
  }
}
