import React from 'react'
import { PowerBIEmbed } from 'powerbi-client-react';
import {models} from 'powerbi-client'

const CustomerSegmentation = () => {
  return (
	<div>
		<div>
			<iframe className='absolute left-0 w-full h-full' title="Customer Segmentation" width="1140" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=15313b7c-7bd8-4812-8ce9-35300e08ad64&autoAuth=true&embeddedDemo=true" frameborder="0" allowFullScreen="true"></iframe>
		</div>
	</div>
  )
}

export default CustomerSegmentation