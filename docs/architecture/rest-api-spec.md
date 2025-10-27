# REST API Spec
```yaml
openapi: 3.0.0
info:
  title: Project Web NMD API
  version: 0.1.0
  description: Minimal endpoints for collaboration inquiries and telemetry.
servers:
  - url: https://project-web-nmd.vercel.app/api
    description: Production
  - url: https://project-web-nmd-preview.vercel.app/api
    description: Preview Deployments
paths:
  /contact:
    post:
      summary: Submit a collaboration inquiry
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CollaborationInquiryInput'
      responses:
        '200':
          description: Submission accepted
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ContactResponse'
        '400':
          description: Validation error
        '500':
          description: Unexpected failure
  /event:
    post:
      summary: Record custom analytics event (audio preview, teaser engagement)
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/EventPayload'
      responses:
        '202':
          description: Event queued

components:
  schemas:
    CollaborationInquiryInput:
      type: object
      required: [name, email, inquiryType, message]
      properties:
        name:
          type: string
          maxLength: 120
        organization:
          type: string
          maxLength: 200
        email:
          type: string
          format: email
        inquiryType:
          type: string
          enum: [collaboration, booking, press, other]
        message:
          type: string
          maxLength: 2000
        targetArtist:
          type: string
        sourcePath:
          type: string
        consentNewsletter:
          type: boolean
    ContactResponse:
      type: object
      properties:
        status:
          type: string
          example: success
        inquiryId:
          type: string
          format: uuid
    EventPayload:
      type: object
      required: [event, properties]
      properties:
        event:
          type: string
          example: audio_preview_start
        properties:
          type: object
          additionalProperties: true
```
