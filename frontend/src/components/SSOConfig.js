import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';



function SSOConfig({ setAlert }) {
  const { theme } = useTheme();
  const isDarkTheme = theme === 'minimal-dark';
  const [provider, setProvider] = useState('Google');
  const [fields, setFields] = useState({
    clientId: '',
    clientSecret: '',
    callbackUrl: '',
    // CyberArk-specific
    ssoType: 'SAML 2.0',
    entityId: '',
    ssoUrl: '',
    cert: '',
    spEntityId: '',
    acsUrl: '',
    nameIdFormat: 'email',
    attributeMapping: [{ cyberark: '', app: '' }],
    jit: false,
    mfa: false,
    logoutUrl: '',
  });

  const handleField = (e) => {
    const { name, value, type, checked } = e.target;
    setFields(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };


 
  const handleMappingChange = (idx, key, value) => {
    setFields(f => {
      const newMapping = [...f.attributeMapping];
      newMapping[idx] = { ...newMapping[idx], [key]: value };
      return { ...f, attributeMapping: newMapping };
    });
  };

  // Add missing addMapping function
  const addMapping = () => {
    setFields(f => ({
      ...f,
      attributeMapping: [...f.attributeMapping, { cyberark: '', app: '' }]
    }));
  };

  // Add missing removeMapping function
  const removeMapping = idx => {
    setFields(f => ({
      ...f,
      attributeMapping: f.attributeMapping.filter((_, i) => i !== idx)
    }));
  };

  // Add missing handleSubmit function
  const handleSubmit = e => {
    e.preventDefault();
    // You can add your save logic here
    if (setAlert) setAlert('SSO configuration saved!');
  };
  
  
  return (
    <div>            
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', margin: '2rem auto', maxWidth: 1100 }}>

        {/* Config Pane */}
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: '2rem', maxWidth: 600, flex: 1 }}>
          <h2 style={{ marginBottom: '1.5rem', color: '#0077C8' }}>SSO Configuration</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label>Provider</label><br />
              <select name="provider" value={provider} onChange={e => setProvider(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }}>
                <option>Google</option>
                <option>Okta</option>
                <option>Azure AD</option>
                <option>CyberArk</option>
              </select>
            </div>
            {/* Standard fields for Google/Okta/Azure AD */}
            {(provider !== 'CyberArk') && (
              <React.Fragment>
                <div style={{ marginBottom: '1rem' }}>
                  <label>Client ID</label><br />
                  <input name="clientId" value={fields.clientId} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label>Client Secret</label><br />
                  <input name="clientSecret" value={fields.clientSecret} onChange={handleField} type="password" style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label>Callback URL</label><br />
                  <input name="callbackUrl" value={fields.callbackUrl} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
                </div>
              </React.Fragment>
            )}
            {/* CyberArk-specific fields */}
            {provider === 'CyberArk' && (
              <React.Fragment>
                <div style={{ marginBottom: '1rem' }}>
                  <label>SSO Type</label><br />
                  <select name="ssoType" value={fields.ssoType} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }}>
                    <option>SAML 2.0</option>
                    <option>OpenID Connect</option>
                  </select>
                </div>
                {fields.ssoType === 'SAML 2.0' && (
                  <React.Fragment>
                    <div style={{ marginBottom: '1rem' }}>
                      <label>Identity Provider Entity ID</label><br />
                      <input name="entityId" value={fields.entityId} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <label>SSO URL / IdP Login URL</label><br />
                      <input name="ssoUrl" value={fields.ssoUrl} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <label>X.509 Certificate</label><br />
                      <textarea name="cert" value={fields.cert} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee', minHeight: 60 }} />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <label>Service Provider Entity ID</label><br />
                      <input name="spEntityId" value={fields.spEntityId} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <label>ACS (Callback) URL</label><br />
                      <input name="acsUrl" value={fields.acsUrl} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <label>NameID Format</label><br />
                      <select name="nameIdFormat" value={fields.nameIdFormat} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }}>
                        <option>email</option>
                        <option>persistent</option>
                        <option>transient</option>
                        <option>unspecified</option>
                      </select>
                    </div>
                  </React.Fragment>
                )}
                {fields.ssoType === 'OpenID Connect' && (
                  <React.Fragment>
                    <div style={{ marginBottom: '1rem' }}>
                      <label>Client ID</label><br />
                      <input name="clientId" value={fields.clientId} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <label>Client Secret</label><br />
                      <input name="clientSecret" value={fields.clientSecret} onChange={handleField} type="password" style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <label>Authorization Endpoint</label><br />
                      <input name="authEndpoint" value={fields.authEndpoint} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <label>Token Endpoint</label><br />
                      <input name="tokenEndpoint" value={fields.tokenEndpoint} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <label>JWKS URI</label><br />
                      <input name="jwksUri" value={fields.jwksUri} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <label>Redirect URI</label><br />
                      <input name="redirectUri" value={fields.redirectUri} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <label>Scopes</label><br />
                      <input name="scopes" value={fields.scopes || ''} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
                    </div>
                  </React.Fragment>
                )}
                <div style={{ marginBottom: '1rem' }}>
                  <label>Attribute Mapping</label><br />
                  <div>
                    {fields.attributeMapping.map((m, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.3rem' }}>
                        <input placeholder="CyberArk Attribute" value={m.cyberark} onChange={e => handleMappingChange(idx, 'cyberark', e.target.value)} style={{ flex: 1, padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
                        <span style={{ alignSelf: 'center' }}>→</span>
                        <input placeholder="App Field" value={m.app} onChange={e => handleMappingChange(idx, 'app', e.target.value)} style={{ flex: 1, padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
                        <button type="button" style={{ background: '#e3e8ee', border: 'none', borderRadius: 4, padding: '0.3rem 0.7rem' }} onClick={() => removeMapping(idx)}>Remove</button>
                      </div>
                    ))}
                  </div>
                  <button type="button" style={{ background: '#0077C8', color: '#fff', border: 'none', borderRadius: 6, padding: '0.3rem 1rem', fontWeight: 600, marginTop: '0.3rem' }} onClick={addMapping}>+ Add Mapping</button>
                </div>
                <div style={{ marginBottom: '1rem', display: 'flex', gap: '1.5rem' }}>
                  <label><input type="checkbox" name="jit" checked={fields.jit} onChange={handleField} /> Enable JIT User Provisioning</label>
                  <label><input type="checkbox" name="mfa" checked={fields.mfa} onChange={handleField} /> Enable Multi-Factor Authentication</label>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label>Logout URL (optional)</label><br />
                  <input name="logoutUrl" value={fields.logoutUrl} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
                </div>
              </React.Fragment>
            )}
            <button type="submit" style={{ background: '#0077C8', color: '#fff', border: 'none', borderRadius: 6, padding: '0.7rem 1.5rem', fontWeight: 600 }}>Save</button>
          </form>
        </div>

        {/* Test Login Section */}
        <div style={{ background: '#f8fafc', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: '2rem', minWidth: 350, flex: '0 0 350px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h3 style={{ color: '#0077C8', marginBottom: '1rem' }}>Test SSO Login</h3>
          <p style={{ fontSize: '0.97rem', color: '#444', marginBottom: '1.5rem', textAlign: 'center' }}>
            Use this section to test your SAML SSO configuration. You will be redirected to the Identity Provider (IdP) for authentication.
          </p>
          <form action="/api/sso/test-login" method="POST" style={{ width: '100%' }}>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="testEmail">Test Email</label><br />
              <input id="testEmail" name="email" type="email" placeholder="user@example.com" style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} required />
            </div>
            <button type="submit" style={{ background: '#0077C8', color: '#fff', border: 'none', borderRadius: 6, padding: '0.6rem 1.2rem', fontWeight: 600, width: '100%' }}>Test Login</button>
          </form>
          <div style={{ marginTop: '2rem', fontSize: '0.93rem', color: '#666', textAlign: 'center' }}>
            <strong>Note:</strong> Ensure your SSO configuration is saved and the IdP is running before testing.
          </div>
        </div>
      
      </div>

      <form action="/api/sso/test-login" method="POST" style={{ width: '100%' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="testEmail">Test Email</label><br />
          <input id="testEmail" name="email" type="email" placeholder="user@example.com" style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} required />
        </div>
        <button type="submit" style={{ background: '#0077C8', color: '#fff', border: 'none', borderRadius: 6, padding: '0.6rem 1.2rem', fontWeight: 600, width: '100%' }}>Test Login</button>
      </form>
      
      <div style={{ marginTop: '2rem', fontSize: '0.93rem', color: '#666', textAlign: 'center' }}>
        <strong>Note:</strong> Ensure your SSO configuration is saved and the IdP is running before testing.
      </div>
      
      <div style={{ marginBottom: '1rem' }}>
        <label>Identity Provider Entity ID</label><br />
        <input name="entityId" value={fields.entityId} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
      </div>
      
      <div style={{ marginBottom: '1rem' }}>
        <label>SSO URL / IdP Login URL</label><br />
        <input name="ssoUrl" value={fields.ssoUrl} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
      </div>
      
      <div style={{ marginBottom: '1rem' }}>
        <label>X.509 Certificate</label><br />
        <textarea name="cert" value={fields.cert} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee', minHeight: 60 }} />
      </div>
      
      <div style={{ marginBottom: '1rem' }}>
        <label>Service Provider Entity ID</label><br />
        <input name="spEntityId" value={fields.spEntityId} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
      </div>
      
      <div style={{ marginBottom: '1rem' }}>
        <label>ACS (Callback) URL</label><br />
        <input name="acsUrl" value={fields.acsUrl} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
      </div>
      
      <div style={{ marginBottom: '1rem' }}>
        <label>NameID Format</label><br />
        <select name="nameIdFormat" value={fields.nameIdFormat} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }}>
          <option>email</option>
          <option>persistent</option>
          <option>transient</option>
          <option>unspecified</option>
        </select>
      </div>

      {fields.ssoType === 'OpenID Connect' && (
        <>
          <div style={{ marginBottom: '1rem' }}>
            <label>Client ID</label><br />
            <input name="clientId" value={fields.clientId} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Client Secret</label><br />
            <input name="clientSecret" value={fields.clientSecret} onChange={handleField} type="password" style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Authorization Endpoint</label><br />
            <input name="authEndpoint" value={fields.authEndpoint} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Token Endpoint</label><br />
            <input name="tokenEndpoint" value={fields.tokenEndpoint} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>JWKS URI</label><br />
            <input name="jwksUri" value={fields.jwksUri} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Redirect URI</label><br />
            <input name="redirectUri" value={fields.redirectUri} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Scopes</label><br />
            <input name="scopes" value={fields.scopes || ''} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
          </div>
        </>
      )}

      <div style={{ marginBottom: '1rem' }}>
        <label>Attribute Mapping</label><br />
        {fields.attributeMapping.map((m, idx) => (
          <div key={idx} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.3rem' }}>
            <input placeholder="CyberArk Attribute" value={m.cyberark} onChange={e => handleMappingChange(idx, 'cyberark', e.target.value)} style={{ flex: 1, padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
            <span style={{ alignSelf: 'center' }}>→</span>
            <input placeholder="App Field" value={m.app} onChange={e => handleMappingChange(idx, 'app', e.target.value)} style={{ flex: 1, padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
            <button type="button" style={{ background: '#e3e8ee', border: 'none', borderRadius: 4, padding: '0.3rem 0.7rem' }} onClick={() => removeMapping(idx)}>Remove</button>
          </div>
        ))}
        <button type="button" style={{ background: '#0077C8', color: '#fff', border: 'none', borderRadius: 6, padding: '0.3rem 1rem', fontWeight: 600, marginTop: '0.3rem' }} onClick={addMapping}>+ Add Mapping</button>
      </div>
      
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1.5rem' }}>
        <label><input type="checkbox" name="jit" checked={fields.jit} onChange={handleField} /> Enable JIT User Provisioning</label>
        <label><input type="checkbox" name="mfa" checked={fields.mfa} onChange={handleField} /> Enable Multi-Factor Authentication</label>
      </div>
      
      <div style={{ marginBottom: '1rem' }}>
        <label>Logout URL (optional)</label><br />
        <input name="logoutUrl" value={fields.logoutUrl} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
      </div>
    </div>
)};

    export default SSOConfig;