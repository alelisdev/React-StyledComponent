import { Styles } from './integrationsStyle';
import { ReactComponent as MailChipIcon } from '../../../../assets/img/admin/mailchip.svg'

export default function Integrations(){
    return (
        <Styles>
            <div className='integration-container'>
                <div className='manro-semi-18'>
                    Integrations
                </div>
                <div className='btn-group'>
                    <div className='btn'>
                        <MailChipIcon />
                        <span>Mailchimp</span>
                        <p>Connected</p>
                    </div>
                    <div className='btn'>
                        <img src='/img/google_integration.svg' alt=''/>
                        <span>Google Tag Manager</span>
                    </div>
                </div>
            </div>

        </Styles>
    )
}